import fs   from "node:fs";
import path from "node:path";

import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  ImageRun,
  Packer,
  Paragraph,
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

import {
  documentNumbering,
  documentStyles,
  MARGINS,
  theme,
  type InlineVariant,
} from "./theme.js";

// ─────────────────────────────────────────────────────────────────────────────
//  NOTE ON STYLING
//  This file contains ZERO hardcoded colors, font names, sizes, or spacing.
//  All styling decisions live in src/theme.ts.
//  To change the look of the resume, edit theme.ts only.
// ─────────────────────────────────────────────────────────────────────────────

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENTRY
═══════════════════════════════════════════════════════════════════════════ */

function render(doc: DocumentNode): Document {
  return new Document({
    styles:    documentStyles,
    numbering: documentNumbering,

    sections: [
      {
        properties: {
          page: {
            margin: MARGINS,
          },
        },
        children: renderBlocks(doc.content),
      },
    ],
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   BLOCK DISPATCHER
═══════════════════════════════════════════════════════════════════════════ */

function renderBlocks(nodes: Block[]): any[] {
  return nodes.flatMap(renderBlock);
}

function renderBlock(node: Block): any[] {
  switch (node.type) {
    case "section":   return renderBlocks(node.content);
    case "heading":   return [renderHeading(node)];
    case "paragraph": return [renderParagraph(node)];
    case "list":      return renderList(node);
    case "table":     return renderTable(node);
    case "image":     return [renderImage(node)];
    default:          return [];
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEADINGS
═══════════════════════════════════════════════════════════════════════════ */

function renderHeading(node: HeadingNode): Paragraph {
  // ── H1: Candidate Name ────────────────────────────────────────────────────
  if (node.level === 1) {
    return new Paragraph({
      ...theme.nameParaOpts(),
      children: [theme.nameRun(flatten(node.content))],
    });
  }

  // ── H2: Section Headings ──────────────────────────────────────────────────
  // ALL CAPS, morning sky blue — no border/underline.
  // Hierarchy is created through color, weight, and generous spacing alone.
  if (node.level === 2) {
    return new Paragraph({
      ...theme.sectionHeadingParaOpts(),
      children: [theme.sectionHeadingRun(flatten(node.content))],
    });
  }

  // ── H3: Sub-headings (project/role titles) ────────────────────────────────
  return new Paragraph({
    ...theme.subHeadingParaOpts(),
    children: [theme.subHeadingRun(flatten(node.content))],
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARAGRAPHS
═══════════════════════════════════════════════════════════════════════════ */

function renderParagraph(node: ParagraphNode): Paragraph {
  switch (node.subtype) {
    // ── Header block ──────────────────────────────────────────────────────
    case "subtitle":
      return new Paragraph({
        ...theme.subtitleParaOpts(),
        children: [theme.subtitleRun(flatten(node.content))],
      });

    case "contact":
      return new Paragraph({
        ...theme.contactParaOpts(),
        // renderInline in 'contact' variant → muted, smaller runs + small links
        children: renderInline(node.content, "contact"),
      });

    case "divider":
      return new Paragraph({
        ...theme.dividerParaOpts(),
        children: [theme.dividerRun()],
      });

    // ── Body metadata ─────────────────────────────────────────────────────
    case "meta":
      return new Paragraph({
        ...theme.metaParaOpts(),
        children: [theme.metaRun(flatten(node.content))],
      });

    case "stack":
      return new Paragraph({
        ...theme.metaParaOpts(),
        children: [theme.stackRun(flatten(node.content))],
      });

    // ── Standard body paragraph ───────────────────────────────────────────
    default:
      return new Paragraph({
        ...theme.bodyParaOpts(),
        children: renderInline(node.content),
      });
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   LISTS
   Custom en-dash bullet (defined in documentNumbering) — small, muted, elegant.
   ATS parsers treat '–' as a list indicator; no parsing issues.
═══════════════════════════════════════════════════════════════════════════ */

function renderList(node: ListNode): Paragraph[] {
  return node.content.map((item) => {
    const children =
      typeof item === "string"
        ? [theme.run(item)]
        : renderInline(item.content);

    return new Paragraph({
      ...theme.bulletParaOpts(),
      children,
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   TABLE / SKILL DEFINITIONS
   "plain" layout (default) → ATS-friendly "Label:  Value" paragraphs.
   "grid" layout            → borderless Word table (for tabular data).
═══════════════════════════════════════════════════════════════════════════ */

function renderTable(node: TableNode): Paragraph[] {
  // "plain" layout (default) — ATS-friendly "Label:  Value" paragraphs.
  // No Word table structure in the output: fully readable by ATS parsers.
  //
  // To switch to a bordered/borderless Word table, change layout to "grid"
  // in data.json and implement a grid renderer here using the docx Table API.
  return node.rows.map((row) => {
    const [labelCell, valueCell] = row.cells;

    // Extract text from either a raw string or a StrongNode / inline node
    const labelText = typeof labelCell === "string"
      ? labelCell
      : flatten((labelCell as any).content ?? []);

    const valueText = typeof valueCell === "string"
      ? valueCell
      : flatten((valueCell as any).content ?? []);

    return new Paragraph({
      ...theme.skillParaOpts(),
      children: [
        theme.skillLabelRun(labelText),
        theme.skillValueRun(valueText),
      ],
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE
═══════════════════════════════════════════════════════════════════════════ */

function renderImage(node: ImageNode): Paragraph {
  const buffer = fs.readFileSync(node.src);

  return new Paragraph({
    alignment: AlignmentType.CENTER,
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

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE RENDERER
   Converts Inline[] → docx run/hyperlink objects.
   variant controls sizing/color for contextual paragraphs (e.g., contact).
═══════════════════════════════════════════════════════════════════════════ */

function renderInline(nodes: Inline[], variant: IV = "body"): any[] {
  const output: any[] = [];

  for (const node of nodes) {
    if (typeof node === "string") {
      output.push(theme.stringRun(node, variant));
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
            children: [theme.linkTextRun(flatten(node.content), variant)],
          }),
        );
        break;
    }
  }

  return output;
}

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════════════════════════ */

function flatten(nodes: Inline[]): string {
  return nodes
    .map((n) => (typeof n === "string" ? n : flatten(n.content)))
    .join("");
}

/* ═══════════════════════════════════════════════════════════════════════════
   ENTRY POINT
═══════════════════════════════════════════════════════════════════════════ */

const json     = JSON.parse(fs.readFileSync("data.json", "utf8")) as DocumentNode;
const document = render(json);
const buffer   = await Packer.toBuffer(document);

fs.writeFileSync(path.resolve("resume.docx"), buffer);
console.log("✅ resume.docx generated");
