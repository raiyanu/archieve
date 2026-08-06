import fs from "node:fs";
import path from "node:path";

import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
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
  ShadingType,
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

import { COLORS, theme } from "./theme.js";

/* ============================================================
   RENDER ENTRY
============================================================ */

function render(document: DocumentNode): Document {
  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },

        children: renderBlocks(document.content),
      },
    ],
  });
}

/* ============================================================
   BLOCK RENDERER
============================================================ */

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

/* ============================================================
   HEADINGS
============================================================ */

function renderHeading(node: HeadingNode) {
  if (node.level === 1) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 0,
        after: 220,
      },

      children: [
        new TextRun({
          text: flatten(node.content),
          bold: true,
          color: COLORS.primary,
          size: 40,
        }),
      ],
    });
  }

  if (node.level === 2) {
    return new Paragraph({
      spacing: {
        before: 260,
        after: 140,
      },

      shading: {
        type: ShadingType.CLEAR,
        fill: COLORS.background,
      },

      border: {
        left: {
          style: BorderStyle.SINGLE,
          color: COLORS.primary,
          size: 8,
        },
      },

      children: [
        new TextRun({
          text: flatten(node.content),
          bold: true,
          color: COLORS.primary,
          size: 28,
        }),
      ],
    });
  }

  return new Paragraph({
    spacing: {
      before: 160,
      after: 80,
    },

    children: [
      new TextRun({
        text: flatten(node.content),
        bold: true,
        color: COLORS.dark,
        size: 24,
      }),
    ],
  });
}

/* ============================================================
   PARAGRAPHS
============================================================ */

function renderParagraph(node: ParagraphNode) {
  return new Paragraph({
    spacing: {
      after: 120,
      line: 276,
    },

    children: renderInline(node.content),
  });
}
function renderList(node: ListNode) {
  return node.content.map((item) => {
    const children =
      typeof item === "string" ? [theme.run(item)] : renderInline(item.content);

    return new Paragraph({
      bullet: {
        level: 0,
      },

      spacing: {
        after: 70,
      },

      indent: {
        left: 420,
        hanging: 220,
      },

      children,
    });
  });
}

function renderTable(node: TableNode) {
  return new Table({
    layout: TableLayoutType.FIXED,

    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },

    rows: node.rows.map(
      (row) =>
        new TableRow({
          children: row.cells.map(
            (cell, index) =>
              new TableCell({
                width: {
                  size: index === 0 ? 28 : 72,
                  type: WidthType.PERCENTAGE,
                },

                verticalAlign: VerticalAlign.CENTER,

                children: [
                  new Paragraph({
                    spacing: {
                      after: 50,
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

function renderImage(node: ImageNode) {
  const buffer = fs.readFileSync(node.src);

  return new Paragraph({
    alignment: AlignmentType.CENTER,

    spacing: {
      before: 120,
      after: 120,
    },

    children: [
      new ImageRun({
        data: buffer,

        transformation: {
          width: node.width ?? 120,
          height: node.height ?? 120,
        },
      }),
    ],
  });
}

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
                text: flatten(node.content),
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

function flatten(nodes: Inline[]): string {
  return nodes
    .map((node) => {
      if (typeof node === "string") {
        return node;
      }

      return flatten(node.content);
    })
    .join("");
}

const json = JSON.parse(fs.readFileSync("data.json", "utf8")) as DocumentNode;

const document = render(json);

const buffer = await Packer.toBuffer(document);

fs.writeFileSync(path.resolve("resume.docx"), buffer);

console.log("✅ resume.docx generated");
