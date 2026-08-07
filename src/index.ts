#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { convertDocxToPdf } from "./pdf.js";
import {
  AlignmentType,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
import type {
  Profile,
  SectionBlock,
  HeadingBlock,
  SubheadingBlock,
  ParagraphBlock,
  BulletListBlock,
  KeyValueListBlock,
  ResumeData,
  Block,
} from "./types.js";

// -----------------------------------------------------------------------------
// __dirname for ES Modules
// -----------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------------------------------------------
// CLI Options & Data Loading
// -----------------------------------------------------------------------------

interface CliOptions {
  dataFile?: string;
  outFile?: string;
  help?: boolean;
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--data-file" || arg === "-d") {
      const nextVal = args[++i];
      if (nextVal !== undefined) {
        options.dataFile = nextVal;
      }
    } else if (arg.startsWith("--data-file=")) {
      const val = arg.split("=")[1];
      if (val !== undefined) {
        options.dataFile = val;
      }
    } else if (arg === "--out" || arg === "-o") {
      const nextVal = args[++i];
      if (nextVal !== undefined) {
        options.outFile = nextVal;
      }
    } else if (arg.startsWith("--out=")) {
      const val = arg.split("=")[1];
      if (val !== undefined) {
        options.outFile = val;
      }
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    }
  }
  return options;
}

function printHelp(): void {
  console.log(`
Resume DOCX Generator CLI

Usage:
  npx tsx src/index.ts [options]
  resume-docx [options]

Options:
  -d, --data-file <path>   Path to resume JSON data file
  -o, --out <path>         Output file path for generated .docx
  -h, --help               Show this help message

Data Resolution Precedence:
  1. CLI parameter (--data-file <path> / -d <path>)
  2. Pipelined input via stdin (e.g. cat data.json | resume-docx)
  3. data.json in Current Working Directory (where command is executed)
  4. data.json in script/package directory
`);
}

async function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", (err) => reject(err));
  });
}

async function loadResumeData(options: CliOptions): Promise<{ data: ResumeData; source: string }> {
  // 1. Check CLI argument (--data-file / -d)
  if (options.dataFile) {
    const resolvedPath = path.resolve(process.cwd(), options.dataFile);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Data file specified via --data-file does not exist: ${resolvedPath}`);
    }
    const content = fs.readFileSync(resolvedPath, "utf8");
    return { data: JSON.parse(content), source: resolvedPath };
  }

  // 2. Check piped data from stdin
  if (!process.stdin.isTTY) {
    const stdinContent = await readStdin();
    if (stdinContent.trim().length > 0) {
      return { data: JSON.parse(stdinContent), source: "piped stdin" };
    }
  }

  // 3. Check data.json in Current Working Directory (execution path)
  const cwdDataPath = path.join(process.cwd(), "data.json");
  if (fs.existsSync(cwdDataPath)) {
    const content = fs.readFileSync(cwdDataPath, "utf8");
    return { data: JSON.parse(content), source: cwdDataPath };
  }

  // 4. Check data.json in script/package directory
  const scriptDataPath = path.join(__dirname, "data.json");
  if (fs.existsSync(scriptDataPath)) {
    const content = fs.readFileSync(scriptDataPath, "utf8");
    return { data: JSON.parse(content), source: scriptDataPath };
  }

  const scriptParentDataPath = path.join(__dirname, "..", "data.json");
  if (fs.existsSync(scriptParentDataPath)) {
    const content = fs.readFileSync(scriptParentDataPath, "utf8");
    return { data: JSON.parse(content), source: scriptParentDataPath };
  }

  throw new Error(
    "Could not find resume JSON data.\n" +
      "Resolution order checked:\n" +
      "  1. --data-file <path> / -d <path> option\n" +
      "  2. Pipelined stdin data\n" +
      `  3. ${cwdDataPath} (Current Working Directory)\n` +
      `  4. ${scriptDataPath} (Script Directory)\n`
  );
}

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

const DARK = "1F2937";
const BLUE = "1565C0";
const GREY = "666666";

// -----------------------------------------------------------------------------
// Numbering
// -----------------------------------------------------------------------------

const numberingConfig = {
  config: [
    {
      reference: "bullet-list",
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: {
                left: 360,
                hanging: 220,
              },
            },
          },
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Profile
// -----------------------------------------------------------------------------

function profileBlock(profile: Profile): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: profile.name,
          bold: true,
          size: 40,
          color: DARK,
        }),
      ],
      spacing: { after: 60 },
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: profile.title,
          size: 24,
          color: BLUE,
          bold: true,
        }),
      ],
      spacing: { after: 120 },
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: `${profile.location}  |  ${profile.phone}  |  ${profile.email}`,
          size: 18,
          color: GREY,
        }),
      ],
      spacing: { after: 40 },
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: profile.links.join("  |  "),
          size: 18,
          color: GREY,
        }),
      ],
      spacing: { after: 300 },
    }),
  ];
}

// -----------------------------------------------------------------------------
// Renderers
// -----------------------------------------------------------------------------

const renderers = {
  section(block: SectionBlock): Paragraph[] {
    return [
      new Paragraph({
        text: block.title,
        heading: HeadingLevel.HEADING_1,
        spacing: {
          before: 300,
          after: 140,
        },
      }),
    ];
  },

  heading(block: HeadingBlock): Paragraph[] {
    const runs = [
      new TextRun({
        text: block.text,
        bold: true,
        size: 22,
        color: DARK,
      }),
    ];

    if (block.meta) {
      runs.push(
        new TextRun({
          text: `   ${block.meta}`,
          size: 20,
          color: GREY,
          italics: true,
        }),
      );
    }

    return [
      new Paragraph({
        children: runs,
        spacing: {
          before: 220,
          after: 60,
        },
      }),
    ];
  },

  subheading(block: SubheadingBlock): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: block.text,
            size: 20,
            italics: true,
            color: GREY,
          }),
        ],
        spacing: {
          after: 100,
        },
      }),
    ];
  },

  paragraph(block: ParagraphBlock): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: block.text,
          }),
        ],
        spacing: {
          after: 160,
        },
      }),
    ];
  },

  list(block: BulletListBlock | KeyValueListBlock): Paragraph[] {
    if (block.style === "keyvalue") {
      return block.items.map(
        (item) =>
          new Paragraph({
            children: [
              new TextRun({
                text: `${item.label}: `,
                bold: true,
                size: 20,
              }),
              new TextRun({
                text: item.value,
                size: 20,
              }),
            ],
            spacing: {
              after: 100,
            },
          }),
      );
    }

    return block.items.map(
      (text) =>
        new Paragraph({
          children: [new TextRun({ text })],
          numbering: {
            reference: "bullet-list",
            level: 0,
          },
          spacing: {
            after: 60,
          },
        }),
    );
  },
};

// -----------------------------------------------------------------------------
// Render blocks
// -----------------------------------------------------------------------------

function renderBlocks(blocks: Block[]): Paragraph[] {
  const out: Paragraph[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "section":
        out.push(...renderers.section(block));
        break;

      case "heading":
        out.push(...renderers.heading(block));
        break;

      case "subheading":
        out.push(...renderers.subheading(block));
        break;

      case "paragraph":
        out.push(...renderers.paragraph(block));
        break;

      case "list":
        out.push(...renderers.list(block));
        break;

      default:
        console.warn("Unknown block:", block);
    }
  }

  return out;
}

// -----------------------------------------------------------------------------
// Main Execution
// -----------------------------------------------------------------------------

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    return;
  }

  let loaded: { data: ResumeData; source: string };
  try {
    loaded = await loadResumeData(options);
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  console.log(`Loading data from: ${loaded.source}`);
  const data = loaded.data;

  // Build document
  const doc = new Document({
    numbering: numberingConfig,
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 12240,
              height: 15840,
            },
            margin: {
              top: 900,
              bottom: 900,
              left: 1000,
              right: 1000,
            },
          },
        },
        children: [...profileBlock(data.profile), ...renderBlocks(data.blocks)],
      },
    ],
  });

  // Determine output file location
  let outFile: string;
  if (options.outFile) {
    outFile = path.resolve(process.cwd(), options.outFile);
  } else {
    const outDir = path.join(process.cwd(), "out");
    outFile = path.join(outDir, "Resume.docx");
  }

  const outDir = path.dirname(outFile);
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outFile, buffer);
  console.log(`Done -> ${outFile}`);

  const pdfFile = outFile.replace(/\.docx$/i, "") + ".pdf";
  await convertDocxToPdf(outFile, pdfFile);
  console.log(`Done -> ${pdfFile}`);
}

main().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error("Failed to generate resume:", err);
  process.exit(1);
});
