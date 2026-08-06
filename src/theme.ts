import {
    AlignmentType,
    BorderStyle,
    HeadingLevel,
    type IParagraphOptions,
    TextRun,
} from "docx";

export class Theme {

    readonly font = "Calibri";
    readonly size = 22;

    heading(level: number): IParagraphOptions {

        switch (level) {

            case 1:

                return {
                    heading: HeadingLevel.TITLE,
                    spacing: {
                        before: 0,
                        after: 240
                    }
                };

            case 2:

                return {

                    heading: HeadingLevel.HEADING_1,

                    spacing: {

                        before: 220,

                        after: 120

                    },

                    border: {

                        bottom: {

                            style: BorderStyle.SINGLE,

                            color: "DDDDDD",

                            size: 1

                        }

                    }

                };

            case 3:

                return {

                    heading: HeadingLevel.HEADING_2,

                    spacing: {

                        before: 160,

                        after: 80

                    }

                };

            default:

                return {};

        }

    }

    paragraph(): IParagraphOptions {

        return {

            spacing: {

                after: 120

            }

        };

    }

    bullet(): IParagraphOptions {

        return {

            bullet: {

                level: 0

            }

        };

    }

    run(text: string) {

        return new TextRun({

            text,

            font: this.font,

            size: this.size

        });

    }

    bold(text: string) {

        return new TextRun({

            text,

            font: this.font,

            size: this.size,

            bold: true

        });

    }

    italic(text: string) {

        return new TextRun({

            text,

            font: this.font,

            size: this.size,

            italics: true

        });

    }

    code(text: string) {

        return new TextRun({

            text,

            font: "Consolas",

            size: this.size

        });

    }

}