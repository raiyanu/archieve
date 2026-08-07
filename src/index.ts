import fs from "node:fs";
import path from "node:path";

import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
  convertInchesToTwip,
} from "docx";

import type {
  Block,
  DocumentNode,
  HeadingNode,
  ImageNode,
  Inline,
  ListNode,
  ParagraphNode,
  TableNode,
} from "./types.js";

import { COLORS, FONT, SIZE, theme } from "./theme.js";

// ─────────────────────────────────────────────────────────────────────────────
// NO-BORDER TABLE CELL HELPER
// Produces a completely invisible cell border definition for borderless tables.
// ─────────────────────────────────────────────────────────────────────────────

const noBorder = {
  top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

const noBorderTable = {
  top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideH: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideV: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

// ─────────────────────────────────────────────────────────────────────────────
// RENDER ENTRY
// ─────────────────────────────────────────────────────────────────────────────

function render(document: DocumentNode): Document {
  return new Document({
    // Register Calibri as the default document font
    styles: {
      default: {
        document: {
          run: {
            font: FONT.body,
            size: SIZE.body,
            color: COLORS.text,
          },
        },
      },
    },

    sections: [
      {
        properties: {
          page: {
            margin: {
              top:    convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.8),
              left:   convertInchesToTwip(0.9),
              right:  convertInchesToTwip(0.9),
            },
          },
        },

        children: renderBlocks(document.content),
      },
    ],
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK RENDERER
// ─────────────────────────────────────────────────────────────────────────────

function renderBlocks(nodes: Block[]) {
  const output: any[] = [];
  for (const node of nodes) {
    output.push(...renderBlock(node));
  }
  return output;
}

function renderBlock(node: Block): any[] {
  switch (node.type) {
    case "section":
      return renderBlocks(node.content);

    case "heading":
      return [renderHeading(node)];

    case "paragraph":
      return [renderParagraph(node)];

    case "list":
      return renderList(node);

    case "table":
      return [renderTable(node)];

    case "image":
      return [renderImage(node)];

    default:
      return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADINGS
// ─────────────────────────────────────────────────────────────────────────────

function renderHeading(node: HeadingNode): Paragraph {
  // ── H1 — Candidate Name ───────────────────────────────────────────────────
  // Large, centered, bold. Sets commanding first impression.
  if (node.level === 1) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 0,
        after:  80,
      },

      children: [
        new TextRun({
          text:  flatten(node.content),
          bold:  true,
          font:  FONT.body,
          size:  SIZE.h1,
          color: COLORS.dark,
        }),
      ],
    });
  }

  // ── H2 — Section Headings ─────────────────────────────────────────────────
  // Bold, slightly larger than body. A thin bottom rule provides section
  // separation without heavy decoration — exactly like the Word reference.
  if (node.level === 2) {
    return new Paragraph({
      spacing: {
        before: 320,
        after:  100,
      },

      // Thin horizontal rule below — the only visual decoration used.
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          color: COLORS.rule,
          size:  4,
        },
      },

      children: [
        new TextRun({
          text:  flatten(node.content).toUpperCase(),
          bold:  true,
          font:  FONT.body,
          size:  SIZE.h2,
          color: COLORS.dark,
          // Small caps gives a polished Word-document feel
          smallCaps: false,
        }),
      ],
    });
  }

  // ── H3 — Sub-headings (Project / Role Titles) ─────────────────────────────
  // Bold, same size as body or slightly larger. No decoration.
  return new Paragraph({
    spacing: {
      before: 180,
      after:  50,
    },

    children: [
      new TextRun({
        text:  flatten(node.content),
        bold:  true,
        font:  FONT.body,
        size:  SIZE.h3,
        color: COLORS.dark,
      }),
    ],
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PARAGRAPHS
// ─────────────────────────────────────────────────────────────────────────────

function renderParagraph(node: ParagraphNode): Paragraph {
  // ── Subtitle (job title under name) ───────────────────────────────────────
  if (node.subtype === "subtitle") {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text:  flatten(node.content),
          font:  FONT.body,
          size:  SIZE.body + 2, // 12pt — slightly above body
          color: COLORS.muted,
          italics: true,
        }),
      ],
    });
  }

  // ── Contact line ──────────────────────────────────────────────────────────
  if (node.subtype === "contact") {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: renderInline(node.content),
    });
  }

  // ── Divider (thin horizontal rule) ─────────────────────────────────────────
  if (node.subtype === "divider") {
    return new Paragraph({
      spacing: { before: 60, after: 60 },
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          color: COLORS.rule,
          size:  4,
        },
      },
      children: [
        new TextRun({ text: "", size: 4 }),
      ],
    });
  }
  if (node.subtype === "meta" || node.subtype === "stack") {
    return new Paragraph({
      spacing: { after: 80, line: 260 },
      children: [
        new TextRun({
          text:    flatten(node.content),
          font:    FONT.body,
          size:    SIZE.small,
          color:   COLORS.muted,
          italics: true,
        }),
      ],
    });
  }

  // ── Standard body paragraph ───────────────────────────────────────────────
  return new Paragraph({
    spacing: {
      after: 80,
      line:  268,
    },
    children: renderInline(node.content),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTS
// ─────────────────────────────────────────────────────────────────────────────

function renderList(node: ListNode): Paragraph[] {
  return node.content.map((item) => {
    const children =
      typeof item === "string"
        ? [theme.run(item)]
        : renderInline(item.content);

    return new Paragraph({
      bullet: {
        level: 0,
      },

      spacing: {
        after: 60,
        line:  268,
      },

      indent: {
        left:    360,
        hanging: 220,
      },

      children,
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TABLES — Borderless two-column layout for skills
// ─────────────────────────────────────────────────────────────────────────────

function renderTable(node: TableNode): Table {
  return new Table({
    layout: TableLayoutType.FIXED,

    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },

    // Remove all outer table borders
    borders: noBorderTable,

    rows: node.rows.map(
      (row) =>
        new TableRow({
          children: row.cells.map(
            (cell, index) =>
              new TableCell({
                width: {
                  size: index === 0 ? 22 : 78,
                  type: WidthType.PERCENTAGE,
                },

                verticalAlign: VerticalAlign.TOP,

                // Remove all cell borders
                borders: noBorder,

                // Subtle top margin per row via paragraph spacing
                children: [
                  new Paragraph({
                    spacing: {
                      after: 60,
                      line:  260,
                    },

                    children: renderInline([cell]),
                  }),
                ],
              }),
          ),
        }),
    ),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────────────────────

function renderImage(node: ImageNode): Paragraph {
  const buffer = fs.readFileSync(node.src);

  return new Paragraph({
    alignment: AlignmentType.CENTER,

    spacing: {
      before: 120,
      after:  120,
    },

    children: [
      new ImageRun({
        data: buffer,
        transformation: {
          width:  node.width  ?? 120,
          height: node.height ?? 120,
        },
      }),
    ],
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE RENDERERS
// ─────────────────────────────────────────────────────────────────────────────

function renderInline(nodes: Inline[]): any[] {
  const output: any[] = [];

  for (const node of nodes) {
    if (typeof node === "string") {
      output.push(theme.run(node));
      continue;
    }

    switch (node.type) {
      case "strong":
        output.push(theme.bold(flatten(node.content)));
        break;

      case "em":
        output.push(theme.italic(flatten(node.content)));
        break;

      case "code":
        output.push(theme.code(flatten(node.content)));
        break;

      case "link":
        output.push(
          new ExternalHyperlink({
            link: node.href,
            children: [
              new TextRun({
                text:  flatten(node.content),
                font:  FONT.body,
                size:  SIZE.body,
                color: COLORS.link,
                style: "Hyperlink",
              }),
            ],
          }),
        );
        break;
    }
  }

  return output;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

function flatten(nodes: Inline[]): string {
  return nodes
    .map((node) => (typeof node === "string" ? node : flatten(node.content)))
    .join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

const json     = JSON.parse(fs.readFileSync("data.json", "utf8")) as DocumentNode;
const document = render(json);
const buffer   = await Packer.toBuffer(document);

fs.writeFileSync(path.resolve("resume.docx"), buffer);

console.log("✅ resume.docx generated");
