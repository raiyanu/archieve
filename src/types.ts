export interface DocumentNode {
    type: "document";
    content: Node[];
}

export interface SectionNode {
    type: "section";
    content: Node[];
}

export interface HeadingNode {
    type: "heading";
    level: number;
    content: InlineNode[];
}

export interface ParagraphNode {
    type: "paragraph";
    content: InlineNode[];
}

export interface ListNode {
    type: "list";
    content: (string | ParagraphNode)[];
}

export interface TableNode {
    type: "table";
    rows: {
        cells: InlineNode[];
    }[];
}

export interface StrongNode {
    type: "strong";
    content: InlineNode[];
}

export interface LinkNode {
    type: "link";
    href: string;
    content: InlineNode[];
}

export interface ImageNode {
    type: "image";
    src: string;
    width?: number;
}

export type InlineNode =
    | string
    | StrongNode
    | LinkNode;

export type Node =
    | SectionNode
    | HeadingNode
    | ParagraphNode
    | ListNode
    | TableNode
    | ImageNode;