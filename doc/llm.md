# LLM Instruction Guide: Writing `data.json` for Resume-Maker

This document serves as the official reference guide for Language Models (LLMs) and developers to generate or update `data.json`, the structured content file consumed by Resume-Maker to render Microsoft Word (`.docx`) resumes.

---

## 1. Overview & Root Architecture

`data.json` consists of two top-level JSON objects:
- `profile`: Candidate header and contact information.
- `blocks`: An ordered array of block objects that construct the body of the resume sequentially.

```json
{
  "profile": { ... },
  "blocks": [ ... ]
}
```

---

## 2. `profile` Object

Defines personal contact details rendered at the top of the resume header.

### Fields
| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Yes | Candidate's full name |
| `title` | `string` | Yes | Professional headline or job title |
| `location` | `string` | Yes | City, State/Province, Country |
| `phone` | `string` | Yes | Contact phone number |
| `email` | `string` | Yes | Professional email address |
| `links` | `string[]` | Yes | List of profile URLs or handles (e.g., LinkedIn, GitHub, portfolio) |

### Example
```json
"profile": {
  "name": "Raiyan Ahmed CM",
  "title": "Frontend Software Engineer",
  "location": "Pernambut, Tamil Nadu, India",
  "phone": "+91 73396 77034",
  "email": "raiyan.c.me@gmail.com",
  "links": [
    "linkedin.com/in/c-raiyan",
    "github.com/raiyanu"
  ]
}
```

---

## 3. `blocks` Array & Supported Block Types

The document body is constructed by processing items in the `blocks` array in sequential order. Each block object must include a valid `type` string.

### 1. `section`
Main category headings (renders as Section Heading 1 with horizontal divider).

- **Properties**:
  - `type`: `"section"`
  - `title` *(string, required)*: Section heading text (e.g., `"Work Experience"`, `"Technical Skills"`).

```json
{ "type": "section", "title": "Work Experience" }
```

---

### 2. `heading`
Primary entry title (e.g., Company Name, Project Name, or Institution).

- **Properties**:
  - `type`: `"heading"`
  - `text` *(string, required)*: Entry title text.
  - `meta` *(string, optional)*: Date range or location info displayed inline/right-aligned in italic font (e.g., `"Nov 2024 - Present"`).

```json
{ "type": "heading", "text": "Colan Infotech Pvt. Ltd.", "meta": "Nov 2024 - Present" }
```

---

### 3. `subheading`
Secondary entry detail (e.g., Job Role title or tech stack summary).

- **Properties**:
  - `type`: `"subheading"`
  - `text` *(string, required)*: Subheading text.

```json
{ "type": "subheading", "text": "Frontend Software Engineer, Tamil Nadu" }
```

---

### 4. `paragraph`
Standard body text paragraph (used for summary statements, project summaries, or standalone descriptions).

- **Properties**:
  - `type`: `"paragraph"`
  - `text` *(string, required)*: Paragraph text content.

```json
{
  "type": "paragraph",
  "text": "Frontend Software Engineer with nearly 2 years of experience building scalable applications..."
}
```

---

### 5. `list`
Renders formatted lists. Controlled by the `style` property.

#### Variant A: Bullet List (`"style": "bullet"` or default)
Displays standard bullet points.

- **Properties**:
  - `type`: `"list"`
  - `style`: `"bullet"` *(optional, default is `"bullet"`)*
  - `items` *(string[], required)*: Array of bullet point strings.

```json
{
  "type": "list",
  "style": "bullet",
  "items": [
    "Developed frontend solutions for enterprise e-commerce platforms using React.js.",
    "Reduced Product Listing Page load time by 50% through routing optimization."
  ]
}
```

#### Variant B: Key-Value List (`"style": "keyvalue"`)
Displays labeled items with a bold prefix (ideal for Technical Skills or Core Competencies).

- **Properties**:
  - `type`: `"list"`
  - `style`: `"keyvalue"` *(required)*
  - `items` *(array of objects, required)*:
    - `label` *(string)*: Bold category prefix (e.g., `"Languages"`).
    - `value` *(string)*: Associated values (e.g., `"JavaScript, TypeScript"`).

```json
{
  "type": "list",
  "style": "keyvalue",
  "items": [
    { "label": "Languages", "value": "JavaScript (ES6+), TypeScript" },
    { "label": "Libraries & Frameworks", "value": "React.js, Next.js, Redux Toolkit" }
  ]
}
```

---

## 4. Key Rules for LLM Data Generation

1. **Logical Block Hierarchy**: Maintain standard resume layout structure:
   - `section` → `heading` → `subheading` → `list` / `paragraph`
2. **Plain Text Strings Only**: Do not embed HTML tags (`<b>`, `<span>`) or Markdown syntax (`**bold**`, `[link](url)`) inside JSON string values. Document formatting and styling are strictly managed by Resume-Maker.
3. **Strict JSON Schema & Types**:
   - `keyvalue` items **must** be an array of `{ "label": string, "value": string }` objects.
   - `bullet` items **must** be an array of strings.
4. **Supported Block Types Only**: Use only `section`, `heading`, `subheading`, `paragraph`, and `list`. Unrecognized block types will be ignored during rendering.

---

## 5. CLI Options & Data Resolution

Resume-Maker supports flexible data loading via CLI flags, stdin, or automatic directory resolution.

### CLI Usage Flags
| Flag | Short | Description | Default |
| :--- | :--- | :--- | :--- |
| `--data-file <path>` | `-d` | Path to custom JSON data file | Automatic fallback |
| `--out <path>` | `-o` | Output path for generated `.docx` | `out/Resume.docx` |
| `--help` | `-h` | Display CLI usage documentation | |

### Execution Examples
```bash
# Standard generation (uses default data.json)
npm run generate

# Specify custom input data and output path
npx tsx src/index.ts -d my-data.json -o out/MyResume.docx

# Pipe JSON data directly via stdin
cat my-data.json | npx tsx src/index.ts -o out/MyResume.docx
```

### Data Resolution Precedence
When no `--data-file` option is specified, Resume-Maker automatically searches for input data in the following order:
1. CLI parameter (`--data-file <path>` / `-d <path>`)
2. Pipelined input via `stdin` (e.g., `cat data.json | resume-docx`)
3. `data.json` in Current Working Directory (where command is executed)
4. `data.json` in the script/package directory

---

## 6. Complete Minimal Example

```json
{
  "profile": {
    "name": "Jane Doe",
    "title": "Software Engineer",
    "location": "City, Country",
    "phone": "+1 234 567 8900",
    "email": "jane@example.com",
    "links": [
      "linkedin.com/in/janedoe",
      "github.com/janedoe"
    ]
  },
  "blocks": [
    { "type": "section", "title": "Professional Summary" },
    { "type": "paragraph", "text": "Results-oriented software engineer..." },
    { "type": "section", "title": "Technical Skills" },
    {
      "type": "list",
      "style": "keyvalue",
      "items": [
        { "label": "Languages", "value": "TypeScript, Python" }
      ]
    },
    { "type": "section", "title": "Work Experience" },
    { "type": "heading", "text": "Tech Corp", "meta": "2022 - Present" },
    { "type": "subheading", "text": "Senior Engineer" },
    {
      "type": "list",
      "style": "bullet",
      "items": [
        "Built and deployed scalable web services."
      ]
    }
  ]
}
```
