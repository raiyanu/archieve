import {
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  type IParagraphOptions,
  TextRun,
} from "docx";

// ─────────────────────────────────────────────────────────────────────────────
// COLOR PALETTE
// Clean white theme — hierarchy through typography and spacing, not color.
// ─────────────────────────────────────────────────────────────────────────────

export const COLORS = {
  // Primary accent — used ONLY for section heading bottom borders
  primary: "1A1A1A",

  // All heading text
  dark: "111111",

  // Body text
  text: "1A1A1A",

  // Secondary / supporting text (dates, locations, labels)
  muted: "555555",

  // Thin rule under section headings
  rule: "CCCCCC",

  // Background (never used as shading — kept for API compatibility)
  background: "FFFFFF",

  // Hyperlinks
  link: "1155CC",

  // Legacy alias — kept for any remaining references
  blue: "1A1A1A",
  gray: "555555",
  border: "CCCCCC",
};

// ─────────────────────────────────────────────────────────────────────────────
// FONT CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

export const FONT = {
  body: "Calibri",
  mono: "Consolas",
};

// ─────────────────────────────────────────────────────────────────────────────
// SIZE SCALE  (docx half-points: size 22 = 11pt, size 24 = 12pt, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export const SIZE = {
  h1: 44,   // 22pt — name
  h1Sub: 24, // 12pt — job title under name
  h2: 26,   // 13pt — section headings
  h3: 24,   // 12pt — sub-headings / project titles
  body: 22, // 11pt — all body text
  small: 20, // 10pt — dates, locations
};

// ─────────────────────────────────────────────────────────────────────────────
// THEME CLASS
// ─────────────────────────────────────────────────────────────────────────────

export class Theme {
  font = FONT.body;

  // Body text
  run(text: string) {
    return new TextRun({
      text,
      font: this.font,
      size: SIZE.body,
      color: COLORS.text,
    });
  }

  // Bold body text (e.g., company names, skill labels)
  bold(text: string) {
    return new TextRun({
      text,
      bold: true,
      font: this.font,
      size: SIZE.body,
      color: COLORS.dark,
    });
  }

  // Name / document title
  title(text: string) {
    return new TextRun({
      text,
      bold: true,
      font: this.font,
      size: SIZE.h1,
      color: COLORS.dark,
    });
  }

  // Section heading text run
  heading1(text: string) {
    return new TextRun({
      text,
      bold: true,
      font: this.font,
      size: SIZE.h2,
      color: COLORS.dark,
      allCaps: false,
    });
  }

  // Sub-heading text run (project titles, role names)
  heading2(text: string) {
    return new TextRun({
      text,
      bold: true,
      font: this.font,
      size: SIZE.h3,
      color: COLORS.dark,
    });
  }

  // Italic / muted text (dates, locations)
  italic(text: string) {
    return new TextRun({
      text,
      italics: true,
      font: this.font,
      size: SIZE.body,
      color: COLORS.muted,
    });
  }

  // Muted / secondary text (non-italic)
  muted(text: string) {
    return new TextRun({
      text,
      font: this.font,
      size: SIZE.small,
      color: COLORS.muted,
    });
  }

  // Monospace inline code
  code(text: string) {
    return new TextRun({
      text,
      font: FONT.mono,
      size: SIZE.body,
      color: COLORS.text,
    });
  }

  // Paragraph-level options for headings (kept for backward compat)
  heading(level: number): IParagraphOptions {
    switch (level) {
      case 1:
        return {
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 240 },
        };

      case 2:
        return {
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 100 },
          border: {
            bottom: {
              style: BorderStyle.SINGLE,
              color: COLORS.rule,
              size: 4,
            },
          },
        };

      case 3:
        return {
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
        };

      default:
        return {};
    }
  }
}

export const theme = new Theme();