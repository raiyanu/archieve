import {
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
  LevelFormat,
  TextRun,
  type IParagraphOptions,
} from "docx";

// ═════════════════════════════════════════════════════════════════════════════
//  DESIGN TOKENS  ──  Single source of truth for every visual decision.
//
//  To restyle the resume, edit ONLY this file.
//  index.ts contains zero hardcoded colors, sizes, or spacing values.
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Color palette.
 * Hex strings without '#', as required by the docx library.
 */
export const COLORS = {
  /** Morning sky blue — section heading accent */
  primary:    '5B9EC9',
  /** Near-black for name, sub-headings, bold text */
  heading:    '1A1E2A',
  /** Warm dark body text — Notion-like, not pure black */
  body:       '2E3D49',
  /** Muted gray — subtitle, dates, contact, separator text */
  muted:      '7D8C98',
  /** Very faint — tech-stack labels, secondary metadata */
  faint:      '9FAAB3',
  /** Hyperlink blue — distinct but harmonious with primary */
  link:       '2471A3',
  /** Divider line under header block */
  rule:       'DDE3E8',
  /** Page background (never applied as shading) */
  background: 'FFFFFF',
};

/**
 * Typography — font family choices.
 * Calibri is the Word default and fully ATS-safe.
 */
export const FONT = {
  body: 'Calibri',
  mono: 'Consolas',
};

/**
 * Size scale in docx half-points (size = pt × 2).
 *
 * 11pt body text = 22 half-points.
 */
export const SIZE = {
  name:  44,   // 22 pt — candidate name
  h2:    24,   // 12 pt — section headings (ALL CAPS + primary color)
  h3:    23,   // 11.5 pt — project / role sub-headings
  body:  22,   // 11 pt — body paragraphs, bullet text
  meta:  20,   // 10 pt — dates, locations, tech-stack labels
  small: 18,   //  9 pt — fine print
};

/**
 * Spacing values in twips (1/20 of a point, docx unit).
 * 240 twips = one line / 12 pt.
 */
export const SPACING = {
  /** Body line height (268 = slightly open single spacing) */
  line:             268,

  // ── Header block ──────────────────────────────────────────────────────────
  nameAfter:         40,   // gap between name and subtitle
  subtitleAfter:     30,   // gap between subtitle and contact
  contactAfter:       0,   // gap between contact and divider
  dividerBefore:     80,   // thin rule — space above
  dividerAfter:      80,   // thin rule — space below

  // ── Body sections ─────────────────────────────────────────────────────────
  sectionBefore:    380,   // breathing room before each section heading
  sectionAfter:     100,   // tight gap between heading and first content
  subHeadingBefore: 180,   // gap before project / role titles
  subHeadingAfter:   40,

  // ── Content ───────────────────────────────────────────────────────────────
  bodyAfter:         80,
  metaAfter:         50,
  bulletAfter:       55,
  skillAfter:        65,   // between skill definition rows
};

/**
 * Page margins in twips (convertInchesToTwip handles conversion).
 * Generous margins for a natural Word document feel.
 */
export const MARGINS = {
  top:    convertInchesToTwip(0.80),
  bottom: convertInchesToTwip(0.80),
  left:   convertInchesToTwip(0.90),
  right:  convertInchesToTwip(0.90),
};

// ─────────────────────────────────────────────────────────────────────────────
//  CUSTOM BULLET NUMBERING
//  En-dash bullet, sized smaller than body text, muted color.
//  ATS parsers read '–' as a list indicator — no parsing issues.
// ─────────────────────────────────────────────────────────────────────────────

/** Numbering reference key consumed by both documentNumbering and bulletParaOpts(). */
export const BULLET_REF = 'resume-minimalist-bullet';

/**
 * Pass to `new Document({ numbering: documentNumbering })`.
 * Defines an en-dash bullet at 10 pt muted gray — minimal, Notion-like.
 */
export const documentNumbering = {
  config: [
    {
      reference: BULLET_REF,
      levels: [
        {
          level:     0,
          format:    LevelFormat.BULLET,
          text:      '–',
          alignment: AlignmentType.LEFT,
          style: {
            run: {
              font:  FONT.body,
              size:  SIZE.meta,     // 10 pt — clearly smaller than body
              color: COLORS.muted,
            },
            paragraph: {
              indent: { left: 280, hanging: 200 },
            },
          },
        },
      ],
    },
  ],
};

/**
 * Pass to `new Document({ styles: documentStyles })`.
 * Sets Calibri as the document-wide default font.
 */
export const documentStyles = {
  default: {
    document: {
      run: {
        font:  FONT.body,
        size:  SIZE.body,
        color: COLORS.body,
      },
    },
  },
};

// ═════════════════════════════════════════════════════════════════════════════
//  THEME CLASS
//  All methods return either IParagraphOptions (to spread into Paragraph)
//  or TextRun instances (ready to push into children[]).
// ═════════════════════════════════════════════════════════════════════════════

/** Context for inline string rendering — adjusts size and color. */
export type InlineVariant = 'body' | 'contact';

export class Theme {
  // ── Paragraph Options ──────────────────────────────────────────────────────
  //  These are spread-merged into `new Paragraph({ ...theme.xParaOpts(), children })`.

  /** Header: large centered name. */
  nameParaOpts(): IParagraphOptions {
    return {
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: SPACING.nameAfter },
    };
  }

  /** Header: italic job title below name. */
  subtitleParaOpts(): IParagraphOptions {
    return {
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: SPACING.subtitleAfter },
    };
  }

  /** Header: contact info line. */
  contactParaOpts(): IParagraphOptions {
    return {
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: SPACING.contactAfter },
    };
  }

  /**
   * Header: thin horizontal rule separating header block from body.
   * Uses border-bottom on an empty paragraph.
   */
  dividerParaOpts(): IParagraphOptions {
    return {
      spacing: { before: SPACING.dividerBefore, after: SPACING.dividerAfter },
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          color: COLORS.rule,
          size:  2,
        },
      },
    };
  }

  /**
   * Section heading (H2).
   * No border, no shading — color + uppercase + spacing create hierarchy.
   */
  sectionHeadingParaOpts(): IParagraphOptions {
    return {
      spacing: {
        before: SPACING.sectionBefore,
        after:  SPACING.sectionAfter,
      },
    };
  }

  /** Sub-heading (H3) — project titles, role names. */
  subHeadingParaOpts(): IParagraphOptions {
    return {
      spacing: {
        before: SPACING.subHeadingBefore,
        after:  SPACING.subHeadingAfter,
      },
    };
  }

  /** Standard body paragraph. */
  bodyParaOpts(): IParagraphOptions {
    return {
      spacing: { after: SPACING.bodyAfter, line: SPACING.line },
    };
  }

  /** Meta / date / location paragraph. */
  metaParaOpts(): IParagraphOptions {
    return {
      spacing: { after: SPACING.metaAfter, line: SPACING.line },
    };
  }

  /**
   * Bullet list item.
   * Uses custom numbering (en-dash, 10 pt, muted) — not the large default bullet.
   */
  bulletParaOpts(): IParagraphOptions {
    return {
      numbering: { reference: BULLET_REF, level: 0 },
      spacing:   { after: SPACING.bulletAfter, line: SPACING.line },
    };
  }

  /**
   * Skills definition row (label: value on one line).
   * ATS-friendly: plain text paragraph, no table.
   */
  skillParaOpts(): IParagraphOptions {
    return {
      spacing: { after: SPACING.skillAfter, line: SPACING.line },
    };
  }

  // ── TextRun Factories ──────────────────────────────────────────────────────

  /** Candidate name — large, bold, dark. */
  nameRun(text: string): TextRun {
    return new TextRun({
      text,
      bold:  true,
      font:  FONT.body,
      size:  SIZE.name,
      color: COLORS.heading,
    });
  }

  /** Job title under name — italic, muted. */
  subtitleRun(text: string): TextRun {
    return new TextRun({
      text,
      italics: true,
      font:    FONT.body,
      size:    SIZE.body,
      color:   COLORS.muted,
    });
  }

  /**
   * Section heading — ALL CAPS, morning sky blue, bold.
   * No border/underline needed; color + spacing signal section start.
   */
  sectionHeadingRun(text: string): TextRun {
    return new TextRun({
      text:  text.toUpperCase(),
      bold:  true,
      font:  FONT.body,
      size:  SIZE.h2,
      color: COLORS.primary,
    });
  }

  /** Sub-heading (H3) — bold, near-black. */
  subHeadingRun(text: string): TextRun {
    return new TextRun({
      text,
      bold:  true,
      font:  FONT.body,
      size:  SIZE.h3,
      color: COLORS.heading,
    });
  }

  /**
   * Context-aware string run used by renderInline().
   * 'body'    → 11 pt, body color  (default)
   * 'contact' → 10 pt, muted color (contact info line)
   */
  stringRun(text: string, variant: InlineVariant = 'body'): TextRun {
    if (variant === 'contact') {
      return new TextRun({ text, font: FONT.body, size: SIZE.meta, color: COLORS.muted });
    }
    return new TextRun({ text, font: FONT.body, size: SIZE.body, color: COLORS.body });
  }

  /** Alias used by list items and generic body paragraphs. */
  run(text: string): TextRun {
    return this.stringRun(text, 'body');
  }

  /** Bold inline (company name, skill label in body text). */
  bold(text: string): TextRun {
    return new TextRun({
      text,
      bold:  true,
      font:  FONT.body,
      size:  SIZE.body,
      color: COLORS.heading,
    });
  }

  /** Italic inline (em emphasis). */
  italic(text: string): TextRun {
    return new TextRun({
      text,
      italics: true,
      font:    FONT.body,
      size:    SIZE.body,
      color:   COLORS.muted,
    });
  }

  /** Meta run — dates, locations, stack labels. */
  metaRun(text: string): TextRun {
    return new TextRun({
      text,
      italics: true,
      font:    FONT.body,
      size:    SIZE.meta,
      color:   COLORS.muted,
    });
  }

  /** Very muted run — tech-stack lines below project titles. */
  stackRun(text: string): TextRun {
    return new TextRun({
      text,
      italics: true,
      font:    FONT.body,
      size:    SIZE.meta,
      color:   COLORS.faint,
    });
  }

  /** Monospace inline code. */
  code(text: string): TextRun {
    return new TextRun({
      text,
      font:  FONT.mono,
      size:  SIZE.body,
      color: COLORS.body,
    });
  }

  /**
   * Hyperlink text run.
   * 'contact' variant uses smaller size to match the contact line.
   */
  linkTextRun(text: string, variant: InlineVariant = 'body'): TextRun {
    return new TextRun({
      text,
      font:  FONT.body,
      size:  variant === 'contact' ? SIZE.meta : SIZE.body,
      color: COLORS.link,
      style: 'Hyperlink',
    });
  }

  /** Skills label run — "Languages:" bold, dark. */
  skillLabelRun(text: string): TextRun {
    return new TextRun({
      text:  text + ':',
      bold:  true,
      font:  FONT.body,
      size:  SIZE.body,
      color: COLORS.heading,
    });
  }

  /** Skills value run — normal weight, body color. */
  skillValueRun(text: string): TextRun {
    return new TextRun({
      text:  '  ' + text,   // two spaces of padding after the colon
      font:  FONT.body,
      size:  SIZE.body,
      color: COLORS.body,
    });
  }

  /** Empty run for divider paragraph (prevents zero-height rendering). */
  dividerRun(): TextRun {
    return new TextRun({ text: '', size: SIZE.small });
  }
}

export const theme = new Theme();