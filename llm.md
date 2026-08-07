# LLM Instruction Guide: Writing `data.json` for Resume-Maker

This document serves as a guide for Language Models (LLMs) and developers on how to generate or update `data.json`, the structured content file consumed by Resume-Maker to render Microsoft Word (`.docx`) resumes.

---

## 1. Overview & Root Architecture

`data.json` consists of two top-level JSON objects:
- `profile`: Candidate's header and contact details.
- `blocks`: An ordered array of block objects that build the body of the resume sequentially.

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
| Property | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Candidate's full name |
| `title` | `string` | Professional headline or job title |
| `location` | `string` | City, State/Province, Country |
| `phone` | `string` | Phone number |
| `email` | `string` | Professional email address |
| `links` | `string[]` | List of profile URLs or handles (e.g. LinkedIn, GitHub) |

### Example
```json
"profile": {
  "name": "Raiyan Ahmed CM",
  "title": "Frontend Software Engineer",
  "location": "Pernambut, Tamil Nadu, India",
  "phone": "+91 73396 77034",
  "email": "raiyan.c.me@gmail.com",
  "links": ["linkedin.com/in/c-raiyan", "github.com/raiyanu"]
}
```

---

## 3. `blocks` Array & Supported Block Types

The document body is constructed by processing items in the `blocks` array in order. Each block must have a valid `"type"`.

### 1. `section`
Main category headings (renders as Section Heading 1).

- **Properties**:
  - `type`: `"section"`
  - `title` *(string)*: Section title text.

```json
{ "type": "section", "title": "Work Experience" }
```

---

### 2. `heading`
Primary entry title (e.g., Company Name, Project Name, or Degree).

- **Properties**:
  - `type`: `"heading"`
  - `text` *(string)*: Entry title.
  - `meta` *(string, optional)*: Date range or location info displayed inline/right-aligned in italic.

```json
{ "type": "heading", "text": "Colan Infotech Pvt. Ltd.", "meta": "Nov 2024 - Present" }
```

---

### 3. `subheading`
Secondary entry detail (e.g., Job Role title or tech stack summary).

- **Properties**:
  - `type`: `"subheading"`
  - `text` *(string)*: Subheading text.

```json
{ "type": "subheading", "text": "Frontend Software Engineer, Tamil Nadu" }
```

---

### 4. `paragraph`
Standard body text paragraph (used for summaries or descriptions).

- **Properties**:
  - `type`: `"paragraph"`
  - `text` *(string)*: Paragraph text content.

```json
{
  "type": "paragraph",
  "text": "Frontend Software Engineer with nearly 2 years of experience building scalable applications..."
}
```

---

### 5. `list`
Used for bullet points or key-value pairs based on the `style` property.

#### Variant A: Bullet List (`"style": "bullet"` or default)
Displays standard bullet points.

- **Properties**:
  - `type`: `"list"`
  - `style`: `"bullet"`
  - `items` *(string[])*: Array of bullet strings.

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
Displays labeled items with a bold prefix (ideal for Technical Skills).

- **Properties**:
  - `type`: `"list"`
  - `style`: `"keyvalue"`
  - `items` *(array of objects)*:
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

1. **Logical Nesting**: Follow standard hierarchy:
   - `section` → `heading` → `subheading` → `list` / `paragraph`
2. **Plain Text Strings**: Do not include HTML tags or Markdown syntax inside string values (e.g., do not use `**bold**` or `[link](url)`). Rendering styles are handled by Resume-Maker.
3. **Strict JSON Types**:
   - `keyvalue` items **must** be an array of `{ "label": string, "value": string }`.
   - `bullet` items **must** be an array of strings.
4. **Supported Types Only**: Only use `section`, `heading`, `subheading`, `paragraph`, and `list`. Unrecognized block types will be skipped.

---

## 5. Minimal Valid Example

```json
{
  "profile": {
    "name": "Jane Doe",
    "title": "Software Engineer",
    "location": "City, Country",
    "phone": "+1 234 567 8900",
    "email": "jane@example.com",
    "links": ["linkedin.com/in/janedoe", "github.com/janedoe"]
  },
  "blocks": [
    { "type": "section", "title": "Professional Summary" },
    { "type": "paragraph", "text": "Results-oriented software engineer..." },
    { "type": "section", "title": "Technical Skills" },
    { "type": "list", "style": "keyvalue", "items": [
      { "label": "Languages", "value": "TypeScript, Python" }
    ]},
    { "type": "section", "title": "Work Experience" },
    { "type": "heading", "text": "Tech Corp", "meta": "2022 - Present" },
    { "type": "subheading", "text": "Senior Engineer" },
    { "type": "list", "style": "bullet", "items": [
      "Built and deployed scalable web services."
    ]}
  ]
}
```
