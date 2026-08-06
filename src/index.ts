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
  TableRow,
  TextRun,
  WidthType,
} from "docx";

/* ============================================================
   AST
============================================================ */

type Inline = string | StrongNode | EmNode | LinkNode | CodeNode;

interface DocumentNode {
  type: "document";
  content: Block[];
}

interface SectionNode {
  type: "section";
  content: Block[];
}

interface HeadingNode {
  type: "heading";
  level: number;
  content: Inline[];
}

interface ParagraphNode {
  type: "paragraph";
  content: Inline[];
}

interface ListNode {
  type: "list";
  ordered?: boolean;
  content: (string | ParagraphNode)[];
}

interface TableNode {
  type: "table";
  rows: {
    cells: Inline[];
  }[];
}

interface ImageNode {
  type: "image";
  src: string;
  width?: number;
  height?: number;
}

interface StrongNode {
  type: "strong";
  content: Inline[];
}

interface EmNode {
  type: "em";
  content: Inline[];
}

interface LinkNode {
  type: "link";
  href: string;
  content: Inline[];
}

interface CodeNode {
  type: "code";
  content: Inline[];
}

type Block =
  | SectionNode
  | HeadingNode
  | ParagraphNode
  | ListNode
  | TableNode
  | ImageNode;

/* ============================================================
   THEME
============================================================ */

const theme = {
  font: "Calibri",

  size: 22,

  heading(level: number) {
    switch (level) {
      case 1:
        return {
          heading: HeadingLevel.TITLE,
          size: 36,
          spacing: 250,
        };

      case 2:
        return {
          heading: HeadingLevel.HEADING_1,
          size: 28,
          spacing: 180,
        };

      case 3:
        return {
          heading: HeadingLevel.HEADING_2,
          size: 24,
          spacing: 150,
        };

      default:
        return {
          heading: HeadingLevel.HEADING_3,
          size: 22,
          spacing: 120,
        };
    }
  },
};

/* ============================================================
   RENDERER
============================================================ */

function render(document: DocumentNode): Document {
  return new Document({
    sections: [
      {
        children: renderBlocks(document.content),
      },
    ],
  });
}

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
  }
}

function renderHeading(node: HeadingNode) {
  const style = theme.heading(node.level);

  return new Paragraph({
    heading: style.heading,

    spacing: {
      before: style.spacing,

      after: 100,
    },

    border:
      node.level === 2
        ? {
            bottom: {
              color: "DDDDDD",

              style: BorderStyle.SINGLE,

              size: 1,
            },
          }
        : undefined,

    children: renderInline(node.content),
  });
}

function renderParagraph(node: ParagraphNode) {
  return new Paragraph({
    spacing: {
      after: 120,
    },

    children: renderInline(node.content),
  });
}

function renderList(node: ListNode) {
  return node.content.map((item) => {
    if (typeof item === "string") {
      return new Paragraph({
        bullet: {
          level: 0,
        },

        children: [new TextRun(item)],
      });
    }

    return new Paragraph({
      bullet: {
        level: 0,
      },

      children: renderInline(item.content),
    });
  });
}

function renderTable(node: TableNode) {
  return new Table({
    width: {
      size: 100,

      type: WidthType.PERCENTAGE,
    },

    rows: node.rows.map(
      (row) =>
        new TableRow({
          children: row.cells.map(
            (cell) =>
              new TableCell({
                children: [
                  new Paragraph({
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
      output.push(
        new TextRun({
          text: node,

          font: theme.font,

          size: theme.size,
        }),
      );

      continue;
    }

    switch (node.type) {
      case "strong":
        output.push(
          new TextRun({
            text: flatten(node.content),

            bold: true,

            font: theme.font,

            size: theme.size,
          }),
        );

        break;

      case "em":
        output.push(
          new TextRun({
            text: flatten(node.content),

            italics: true,

            font: theme.font,

            size: theme.size,
          }),
        );

        break;

      case "code":
        output.push(
          new TextRun({
            text: flatten(node.content),

            font: "Consolas",

            size: theme.size,
          }),
        );

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

/* ============================================================
   MAIN
============================================================ */

const json = JSON.parse(fs.readFileSync("data.json", "utf8")) as DocumentNode;

const document = render(json);

const buffer = await Packer.toBuffer(document);

fs.writeFileSync(
  path.resolve("resume.docx"),

  buffer,
);

console.log("✅ resume.docx generated");
