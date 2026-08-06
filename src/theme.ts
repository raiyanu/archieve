import {
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  type IParagraphOptions,
  TextRun,
} from "docx";

export const COLORS = {
  blue: "2E74B5",
  text: "000000",
  gray: "666666",
  border: "D9D9D9",
};

export class Theme {
  font = "Calibri";

  body = 22;
  h1 = 56;
  h2 = 32;
  h3 = 26;

  heading(level: number): IParagraphOptions {
    switch (level) {
      case 1:
        return {
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.LEFT,
          spacing: {
            before: 0,
            after: 240,
          },
        };

      case 2:
        return {
          heading: HeadingLevel.HEADING_1,

          spacing: {
            before: 240,
            after: 120,
          },

          border: {
            bottom: {
              style: BorderStyle.SINGLE,
              color: COLORS.border,
              size: 2,
            },
          },
        };

      case 3:
        return {
          heading: HeadingLevel.HEADING_2,

          spacing: {
            before: 160,
            after: 80,
          },
        };

      default:
        return {};
    }
  }

  run(text: string) {
    return new TextRun({
      text,
      font: this.font,
      size: this.body,
      color: COLORS.text,
    });
  }

  bold(text: string) {
    return new TextRun({
      text,
      bold: true,
      font: this.font,
      size: this.body,
      color: COLORS.text,
    });
  }

  title(text: string) {
    return new TextRun({
      text,
      bold: true,
      font: this.font,
      size: this.h1,
      color: COLORS.text,
    });
  }

  heading1(text: string) {
    return new TextRun({
      text,
      bold: true,
      font: this.font,
      size: this.h2,
      color: COLORS.blue,
    });
  }

  heading2(text: string) {
    return new TextRun({
      text,
      bold: true,
      font: this.font,
      size: this.h3,
      color: COLORS.blue,
    });
  }

  italic(text: string) {
    return new TextRun({
      text,
      italics: true,
      font: this.font,
      size: this.body,
      color: COLORS.gray,
    });
  }

  code(text: string) {
    return new TextRun({
      text,
      font: "Consolas",
      size: this.body,
    });
  }
}

export const theme = new Theme();