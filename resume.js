const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, LevelFormat
} = require("docx");
const fs = require("fs");
const path = require("path");

// ---------------- LOAD DATA FROM JSON ----------------
const dataPath = path.join(__dirname, "data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// ---------------- COLORS ----------------
const DARK = "1F2937";
const BLUE = "1565C0";
const GREY = "666666";

// ---------------- NUMBERING CONFIG ----------------
const numberingConfig = {
  config: [
    {
      reference: "bullet-list",
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 220 } } } },
      ],
    },
  ],
};

// ---------------- PROFILE HEADER ----------------
function profileBlock(profile) {
  return [
    new Paragraph({
      children: [new TextRun({ text: profile.name, bold: true, size: 40, color: DARK })],
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: profile.title, size: 24, color: BLUE, bold: true })],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `${profile.location}  |  ${profile.phone}  |  ${profile.email}`, size: 18, color: GREY })],
      spacing: { after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: profile.links.join("  |  "), size: 18, color: GREY })],
      spacing: { after: 300 },
    }),
  ];
}

// ---------------- BLOCK RENDERERS (one per semantic type) ----------------
const renderers = {
  section(block) {
    return [
      new Paragraph({
        text: block.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 140 },
      }),
    ];
  },

  heading(block) {
    const runs = [new TextRun({ text: block.text, bold: true, size: 22, color: DARK })];
    if (block.meta) {
      runs.push(new TextRun({ text: `   ${block.meta}`, size: 20, color: GREY, italics: true }));
    }
    return [new Paragraph({ children: runs, spacing: { before: 220, after: 60 } })];
  },

  subheading(block) {
    return [
      new Paragraph({
        children: [new TextRun({ text: block.text, size: 20, italics: true, color: GREY })],
        spacing: { after: 100 },
      }),
    ];
  },

  paragraph(block) {
    return [
      new Paragraph({
        children: [new TextRun({ text: block.text })],
        spacing: { after: 160 },
      }),
    ];
  },

  list(block) {
    if (block.style === "keyvalue") {
      return block.items.map(
        (item) =>
          new Paragraph({
            children: [
              new TextRun({ text: `${item.label}: `, bold: true, size: 20 }),
              new TextRun({ text: item.value, size: 20 }),
            ],
            spacing: { after: 100 },
          })
      );
    }
    // default: bullet list
    return block.items.map(
      (text) =>
        new Paragraph({
          children: [new TextRun({ text })],
          numbering: { reference: "bullet-list", level: 0 },
          spacing: { after: 60 },
        })
    );
  },
};

// ---------------- RENDER ALL BLOCKS ----------------
function renderBlocks(blocks) {
  const out = [];
  blocks.forEach((block) => {
    const renderer = renderers[block.type];
    if (!renderer) {
      console.warn(`Unknown block type "${block.type}", skipping`);
      return;
    }
    out.push(...renderer(block));
  });
  return out;
}

// ---------------- BUILD DOCUMENT ----------------
const docSections = [
  {
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 900, bottom: 900, left: 1000, right: 1000 },
      },
    },
    children: [
      ...profileBlock(data.profile),
      ...renderBlocks(data.blocks),
    ],
  },
];

const doc = new Document({
  numbering: numberingConfig,
  sections: docSections,
});

// ---------------- WRITE FILE ----------------
const outDir = "./out/";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, "Resume.docx");

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outFile, buf);
  console.log(`done -> ${outFile}`);
});