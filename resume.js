const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow,
  TableCell, WidthType, ShadingType, BorderStyle, AlignmentType,
  LevelFormat, ExternalHyperlink
} = require("docx");

// ---------------- CLI ARG PARSING ----------------
// Usage: node resume.js --column 1   (single column, default)
//        node resume.js --column 2   (two-column sidebar)
const args = process.argv.slice(2);
let COLUMN_MODE = 1;
const colFlagIndex = args.indexOf("--column");
if (colFlagIndex !== -1 && args[colFlagIndex + 1]) {
  const val = parseInt(args[colFlagIndex + 1], 10);
  if (val === 1 || val === 2) {
    COLUMN_MODE = val;
  } else {
    console.warn(`Invalid --column value "${args[colFlagIndex + 1]}", defaulting to 1`);
  }
}
console.log(`Generating resume in ${COLUMN_MODE}-column layout...`);

// ---------------- COLORS ----------------
const DARK = "1F2937";
const BLUE = "1565C0";
const GREY = "666666";
const HEAD_BG = "1F2937";
const LIGHT_BG = "F3F4F6";

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

function cell(children, { width, bg, borders } = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: bg ? { type: ShadingType.CLEAR, color: "auto", fill: bg } : undefined,
    margins: { top: 160, bottom: 160, left: 200, right: 200 },
    borders: borders,
    children: Array.isArray(children) ? children : [children],
  });
}

// ---------------- SHARED CONTENT BLOCKS ----------------

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

function titleBlock() {
  return [
    new Paragraph({
      children: [new TextRun({ text: "Raiyan Ahmed CM", bold: true, size: 40, color: DARK })],
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Frontend Software Engineer", size: 24, color: BLUE, bold: true })],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Pernambut, Tamil Nadu, India  |  +91 73396 77034  |  raiyan.c.me@gmail.com", size: 18, color: GREY }),
      ],
      spacing: { after: 40 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "linkedin.com/in/c-raiyan  |  github.com/raiyanu", size: 18, color: GREY }),
      ],
      spacing: { after: 300 },
    }),
  ];
}

function summaryBlock() {
  return [
    h1("Professional Summary"),
    p(
      "Frontend Software Engineer with nearly 2 years of experience building scalable, high-performance React.js applications for enterprise e-commerce and business platforms. Skilled in React.js, Redux Toolkit, TypeScript, and modern JavaScript, with experience modernizing legacy applications, optimizing performance and SEO, and collaborating with cross-functional Agile teams."
    ),
  ];
}

function experienceBlock() {
  return [
    h1("Work Experience"),
    new Paragraph({
      children: [
        new TextRun({ text: "Colan Infotech Pvt. Ltd.", bold: true, size: 22 }),
        new TextRun({ text: "   Nov 2024 - Present", size: 20, color: GREY, italics: true }),
      ],
      spacing: { after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Frontend Software Engineer, Tamil Nadu", size: 20, italics: true, color: GREY })],
      spacing: { after: 100 },
    }),
    bullet("Develop frontend solutions for enterprise e-commerce and business platforms using React.js, TypeScript, and modern web technologies."),
    bullet("Collaborate with cross-functional teams including backend engineers, QA, designers, and client stakeholders to deliver high-quality software."),
    bullet("Participate in architecture discussions, code reviews, debugging, release management, production support, and continuous application improvements."),
    bullet("Build reusable frontend components, improve code maintainability, and implement responsive, accessible user interfaces following industry best practices."),
    bullet("Contribute to Agile development processes, ensuring timely delivery of scalable and reliable frontend features."),
  ];
}

function projectsBlock() {
  return [
    h1("Projects"),
    h2("6thStreet — Enterprise E-commerce Platform (Apparel Group)"),
    bullet("Developed and enhanced multiple business-critical e-commerce modules supporting customer shopping journeys."),
    bullet("Implemented complete Arabic and English localization across newly developed interfaces."),
    bullet("Reduced Product Listing Page load time by approximately 50% by resolving a complex routing issue."),
    bullet("Improved frontend performance by eliminating redundant API calls and resolving memory leaks."),
    bullet("Enhanced Algolia search and filtering functionality for improved product discovery."),
    bullet("Implemented MoEngage event tracking for customer analytics."),
    bullet("Developed an internal automation tool that generated 1,000+ product configuration variants across 50 product categories, reducing manual effort from 2 weeks to approximately 3 days."),
    bullet("Expanded New Relic monitoring coverage to improve production issue diagnosis."),
    bullet("Supported production deployments, domain migration, and platform rebranding."),

    h2("OntoRX — Legacy Dashboard Modernization (SheThink)"),
    new Paragraph({
      children: [new TextRun({ text: "React.js, Redux Toolkit, React Router, Material UI, PrimeReact, Formik, Yup, JavaScript", size: 18, italics: true, color: GREY })],
      spacing: { after: 100 },
    }),
    bullet("Led the frontend modernization of a legacy ASP.NET dashboard by rebuilding it as a modern React.js application while preserving existing functionality."),
    bullet("Improved application performance by over 60% through reusable component architecture, optimized rendering, and efficient state management."),
    bullet("Achieved a perfect SEO score of 100 by implementing semantic HTML and frontend optimization best practices."),
    bullet("Designed a reusable component library that improved maintainability and accelerated future feature development."),
    bullet("Implemented role-based routing and UI rendering for Admin, Author, and Manager workflows."),
    bullet("Developed a dynamic analytics query builder supporting complex AND/OR filtering logic."),
    bullet("Built a configurable drag-and-drop CRUD form builder using dnd-kit, Formik, and Yup."),
    bullet("Collaborated with backend engineers and business stakeholders to deliver production-ready features."),
  ];
}

function educationBlock() {
  return [
    h1("Education"),
    new Paragraph({
      children: [
        new TextRun({ text: "Bachelor of Science in Computer Science", bold: true, size: 20 }),
        new TextRun({ text: "   June 2021 - May 2024", size: 18, color: GREY, italics: true }),
      ],
      spacing: { after: 20 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "Mazharul Uloom College, Ambur, Tamil Nadu", size: 18, color: GREY })],
      spacing: { after: 200 },
    }),
  ];
}

function skillsBlockInline() {
  // Used in 1-column layout as a normal section
  return [
    h1("Technical Skills"),
    skillRow("Languages", "JavaScript (ES6+), TypeScript"),
    skillRow("Libraries & Frameworks", "React.js, Next.js, Redux, Redux Toolkit, React Router"),
    skillRow("UI & Styling", "HTML5, CSS3, SCSS, Tailwind CSS, Material UI, Shadcn UI"),
    skillRow("Web & APIs", "REST APIs, Axios, Node.js, Express.js"),
    skillRow("Databases", "MongoDB, Firebase"),
    skillRow("Tools & Platforms", "Git, GitHub, Jira, Jenkins, AWS S3, Vite, Postman, Figma"),
    skillRow("AI Tools", "Antigravity, ChatGPT, Claude, NotebookLM, GitHub Copilot"),
  ];
}

function skillsBlockSidebar() {
  // Used in 2-column layout, condensed for narrow sidebar width
  const skillItem = (label, value) => [
    new Paragraph({
      children: [new TextRun({ text: label, bold: true, size: 18, color: DARK })],
      spacing: { after: 20, before: 120 },
    }),
    new Paragraph({
      children: [new TextRun({ text: value, size: 17, color: GREY })],
      spacing: { after: 40 },
    }),
  ];

  return [
    new Paragraph({
      children: [new TextRun({ text: "TECHNICAL SKILLS", bold: true, size: 20, color: "FFFFFF" })],
      spacing: { after: 120, before: 60 },
    }),
    ...skillItem("Languages", "JavaScript (ES6+), TypeScript"),
    ...skillItem("Frameworks", "React.js, Next.js, Redux, Redux Toolkit, React Router"),
    ...skillItem("UI & Styling", "HTML5, CSS3, SCSS, Tailwind CSS, Material UI, Shadcn UI"),
    ...skillItem("Web & APIs", "REST APIs, Axios, Node.js, Express.js"),
    ...skillItem("Databases", "MongoDB, Firebase"),
    ...skillItem("Tools", "Git, GitHub, Jira, Jenkins, AWS S3, Vite, Postman, Figma"),
    ...skillItem("AI Tools", "Antigravity, ChatGPT, Claude, NotebookLM, GitHub Copilot"),
  ].map((el) => {
    // re-color text runs to white for dark sidebar background
    return el;
  });
}

function contactSidebarBlock() {
  return [
    new Paragraph({
      children: [new TextRun({ text: "CONTACT", bold: true, size: 20, color: "FFFFFF" })],
      spacing: { after: 120, before: 60 },
    }),
    new Paragraph({ children: [new TextRun({ text: "Pernambut, Tamil Nadu, India", size: 17, color: "E5E7EB" })], spacing: { after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: "+91 73396 77034", size: 17, color: "E5E7EB" })], spacing: { after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: "raiyan.c.me@gmail.com", size: 17, color: "E5E7EB" })], spacing: { after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: "linkedin.com/in/c-raiyan", size: 17, color: "E5E7EB" })], spacing: { after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: "github.com/raiyanu", size: 17, color: "E5E7EB" })], spacing: { after: 200 } }),
  ];
}

// ---------------- BUILD DOC BASED ON COLUMN_MODE ----------------

let docSections;

if (COLUMN_MODE === 1) {
  // ---- SINGLE COLUMN LAYOUT ----
  docSections = [
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
        ...skillsBlockInline(),
        ...experienceBlock(),
        ...projectsBlock(),
        ...educationBlock(),
      ],
    },
  ];
} else {
  // ---- TWO COLUMN (SIDEBAR) LAYOUT ----
  const SIDEBAR_WIDTH = 3200;
  const MAIN_WIDTH = 6800;

  const layoutTable = new Table({
    width: { size: 10000, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    },
    rows: [
      new TableRow({
        children: [
          cell(
            [
              new Paragraph({
                children: [new TextRun({ text: "Raiyan Ahmed CM", bold: true, size: 30, color: "FFFFFF" })],
                spacing: { after: 40 },
              }),
              new Paragraph({
                children: [new TextRun({ text: "Frontend Software Engineer", size: 18, color: "D1D5DB" })],
                spacing: { after: 200 },
              }),
              ...contactSidebarBlock(),
              ...skillsBlockSidebar(),
            ],
            { width: SIDEBAR_WIDTH, bg: HEAD_BG }
          ),
          cell(
            [
              ...summaryBlock(),
              ...experienceBlock(),
              ...projectsBlock(),
              ...educationBlock(),
            ],
            { width: MAIN_WIDTH }
          ),
        ],
      }),
    ],
  });

  docSections = [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 600, bottom: 600, left: 600, right: 600 },
        },
      },
      children: [layoutTable],
    },
  ];
}

const doc = new Document({
  numbering: numberingConfig,
  sections: docSections,
});

// ---------------- WRITE FILE ----------------
const fs = require("fs");
const path = require("path");
const outDir = "./out/";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, `Resume_${COLUMN_MODE}col.docx`);

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outFile, buf);
  console.log(`done -> ${outFile}`);
});