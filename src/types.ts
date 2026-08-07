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
  /**
   * Optional semantic variant — controls alignment and styling.
   *
   * subtitle  → centered italic muted (job title under name)
   * contact   → centered small muted (contact info with links)
   * divider   → empty paragraph with thin bottom border (header separator)
   * meta      → small muted italic (dates, locations)
   * stack     → very small faint italic (tech-stack labels under projects)
   */
  subtype?: "subtitle" | "contact" | "divider" | "meta" | "stack";
  content: Inline[];
}

export interface ListNode {
  type: "list";
  ordered?: boolean;
  content: (string | ParagraphNode)[];
}

export interface TableNode {
  type: "table";
  /**
   * layout "plain"  → each row becomes a "Label:  Value" paragraph (ATS-safe, no Word table)
   * layout "grid"   → rendered as a proper table (borderless)
   * Omit or "plain" is the default for skills sections.
   */
  layout?: "plain" | "grid";
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