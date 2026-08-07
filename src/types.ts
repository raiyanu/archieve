export type Inline =
  | string
  | StrongNode
  | EmNode
  | LinkNode
  | CodeNode;

export interface DocumentNode {
  type: "document";
  content: Block[];
}

export interface SectionNode {
  type: "section";
  content: Block[];
}

export interface HeadingNode {
  type: "heading";
  level: number;
  content: Inline[];
}

export interface ParagraphNode {
  type: "paragraph";
  /** Optional semantic variant — controls alignment and styling */
  subtype?: "subtitle" | "contact" | "meta" | "stack" | "divider";
  content: Inline[];
}

export interface ListNode {
  type: "list";
  ordered?: boolean;
  content: (string | ParagraphNode)[];
}

export interface TableNode {
  type: "table";
  rows: {
    cells: Inline[];
  }[];
}

export interface ImageNode {
  type: "image";
  src: string;
  width?: number;
  height?: number;
}

export interface StrongNode {
  type: "strong";
  content: Inline[];
}

export interface EmNode {
  type: "em";
  content: Inline[];
}

export interface LinkNode {
  type: "link";
  href: string;
  content: Inline[];
}

export interface CodeNode {
  type: "code";
  content: Inline[];
}

export type Block =
  | SectionNode
  | HeadingNode
  | ParagraphNode
  | ListNode
  | TableNode
  | ImageNode;