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

// ---------------- HELPERS ----------------
function h1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 140 },
  });
}

function h2(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: DARK, ...opts })],
    spacing: { before: 220, after: 80 },
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 120 },
  });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 60 },
  });
}

function skillRow(label, value) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 20 }),
      new TextRun({ text: value, size: 20 }),
    ],
    spacing: { after: 100 },
  });
}

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

// ---------------- BUILD BLOCKS FROM DATA ----------------
function titleBlock() {
  return [
    new Paragraph({
      children: [new TextRun({ text: data.name, bold: true, size: 40, color: DARK })],
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: data.title, size: 24, color: BLUE, bold: true })],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${data.location}  |  ${data.phone}  |  ${data.email}`, size: 18, color: GREY }),
      ],
      spacing: { after: 40 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${data.linkedin}  |  ${data.github}`, size: 18, color: GREY }),
      ],
      spacing: { after: 300 },
    }),
  ];
}

function summaryBlock() {
  return [
    h1("Professional Summary"),
    p(data.summary),
  ];
}

function skillsBlock() {
  return [
    h1("Technical Skills"),
    ...data.skills.map((s) => skillRow(s.label, s.value)),
  ];
}

function experienceBlock() {
  const blocks = [h1("Work Experience")];
  data.experience.forEach((exp) => {
    blocks.push(
      new Paragraph({
        children: [
          new TextRun({ text: exp.company, bold: true, size: 22 }),
          new TextRun({ text: `   ${exp.duration}`, size: 20, color: GREY, italics: true }),
        ],
        spacing: { after: 40 },
      }),
      new Paragraph({
        children: [new TextRun({ text: exp.role, size: 20, italics: true, color: GREY })],
        spacing: { after: 100 },
      }),
      ...exp.bullets.map((b) => bullet(b))
    );
  });
  return blocks;
}

function projectsBlock() {
  const blocks = [h1("Projects")];
  data.projects.forEach((proj) => {
    blocks.push(h2(proj.name));
    if (proj.stack) {
      blocks.push(
        new Paragraph({
          children: [new TextRun({ text: proj.stack, size: 18, italics: true, color: GREY })],
          spacing: { after: 100 },
        })
      );
    }
    blocks.push(...proj.bullets.map((b) => bullet(b)));
  });
  return blocks;
}

function educationBlock() {
  const blocks = [h1("Education")];
  data.education.forEach((edu) => {
    blocks.push(
      new Paragraph({
        children: [
          new TextRun({ text: edu.degree, bold: true, size: 20 }),
          new TextRun({ text: `   ${edu.duration}`, size: 18, color: GREY, italics: true }),
        ],
        spacing: { after: 20 },
      }),
      new Paragraph({
        children: [new TextRun({ text: edu.school, size: 18, color: GREY })],
        spacing: { after: 200 },
      })
    );
  });
  return blocks;
}

// ---------------- BUILD DOCUMENT (single column) ----------------
const docSections = [
  {
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 900, bottom: 900, left: 1000, right: 1000 },
      },
    },
    children: [
      ...titleBlock(),
      ...summaryBlock(),
      ...skillsBlock(),
      ...experienceBlock(),
      ...projectsBlock(),
      ...educationBlock(),
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