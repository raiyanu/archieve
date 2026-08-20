# Project: resume_ui_v2 — .docx Resume Generator

## Overview

A TypeScript Node.js project that generates a professional Microsoft Word `.docx` resume from a structured `data.json` file using the `docx` npm library (v9). Inspired by Notion's minimalism — clean white, morning sky blue accent, no decorative borders.

## Tech Stack

- **Runtime**: Node.js ESM (`"type": "module"`)
- **Language**: TypeScript 7 (strict)
- **Key Dependency**: `docx@^9.7.1`
- **Dev Tools**: `tsx`, `@types/node`
- **Run Command**: `npx tsx src/index.ts` (from project root)
- **Output**: `resume.docx` in project root

## Architecture

```
src/
  theme.ts    — ALL styling: colors, fonts, sizes, spacing, numbering, paragraph options, TextRun factories
  index.ts    — Pure structure: reads data.json, calls theme methods, assembles Document
  types.ts    — TypeScript AST types for data.json
  renderer/   — Empty (reserved)
data.json     — Resume content in AST format
resume.js     — CommonJS generator script consuming data.json
llm.md        — Specification & LLM guide for writing valid data.json
resume.docx   — Generated output
```

## Key Design Principle: Centralized Theme

**`theme.ts` is the single source of truth for ALL styling.**
`index.ts` contains ZERO hardcoded colors, font names, sizes, or spacing.
To restyle — edit `theme.ts` only.

### theme.ts exports
- `COLORS` — all color hex values
- `FONT` — font family names
- `SIZE` — half-point size scale
- `SPACING` — twip spacing values
- `MARGINS` — page margins
- `BULLET_REF` — numbering reference key
- `documentNumbering` — custom bullet config (en-dash, 10pt, muted)
- `documentStyles` — document-wide default font
- `InlineVariant` — type for inline rendering context ('body' | 'contact')
- `theme` — Theme class instance with:
  - `xParaOpts()` methods → IParagraphOptions to spread into Paragraph
  - `xRun(text)` methods → TextRun instances for children[]

## Data Model (AST)

### Block Types
- `section` → groups content
- `heading` → level 1=name, 2=section, 3=sub-heading
- `paragraph` → body text, with optional `subtype`
- `list` → bullet list (en-dash bullets via custom numbering)
- `table` → skill definitions (always use `"layout": "plain"` for ATS safety)
- `image` → centered image

### ParagraphNode.subtype values
- `subtitle` → centered italic muted (job title)
- `contact` → centered small muted with link support (contact line)
- `divider` → thin horizontal rule (header separator only)
- `meta` → small italic muted (dates, institution)
- `stack` → very faint italic (tech-stack under project headings)

### TableNode.layout values
- `"plain"` (default) → ATS-friendly "Label:  Value" paragraphs — NO Word table
- `"grid"` → borderless Word table (rarely used)

## Design System

### Color Palette
- `primary`: `5B9EC9` — morning sky blue (section headings)
- `heading`: `1A1E2A` — near-black (name, sub-headings, bold)
- `body`: `2E3D49` — warm dark body text
- `muted`: `7D8C98` — dates, subtitle, contact
- `faint`: `9FAAB3` — tech-stack labels
- `link`: `2471A3` — hyperlinks
- `rule`: `DDE3E8` — header divider line

### Typography
- Font: Calibri (Word default, ATS-safe)
- Name: 22pt bold
- Section H2: 12pt bold ALL CAPS + primary color (no border/underline)
- Sub H3: 11.5pt bold
- Body: 11pt
- Meta: 10pt italic muted
- Stack: 10pt italic faint

### Bullet Points
- Custom en-dash (`–`) bullet via `documentNumbering`
- Size: 10pt (smaller than body 11pt) — elegant, minimal
- Color: muted gray
- NOT using docx default `bullet: { level: 0 }` (which renders large filled circle)

### ATS Optimizations
- Skills section uses PLAIN paragraphs "Label:  Value" — no Word table
- Core Competencies as single compact paragraph with `·` separators
- Standard Calibri font — fully ATS-readable
- No text boxes, no headers/footers for content
- Contact info in body (not in Word header/footer)
- Standard bullet structure via docx numbering

## CLI Options & Data Loading Resolution

`src/index.ts` works as a CLI executable (`resume-docx`). It resolves resume JSON data with the following precedence order:

1. **CLI Flag**: `--data-file <path>` / `-d <path>`
2. **Piped Stdin**: `cat data.json | npx tsx src/index.ts`
3. **CWD File**: `data.json` in execution working directory (`process.cwd()`)
4. **Script Directory File**: `data.json` in package directory (`__dirname`)

### CLI Options:
- `-d, --data-file <path>`: Specify input resume JSON filepath
- `-o, --out <path>`: Specify output `.docx` filepath (defaults to `./out/Resume.docx`)
- `-h, --help`: Show usage help

## Known Issues / Gotchas

- `TextRun` is imported in `index.ts` for rendering inline text
- `data.json` is automatically resolved in order: CLI flag → stdin → CWD `data.json` → Script dir `data.json`
- Executable binary configured in `package.json` under `"bin": { "resume-docx": "./src/index.ts" }`

