
// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  links: string[];
}

export interface SectionBlock {
  type: "section";
  title: string;
}

export interface HeadingBlock {
  type: "heading";
  text: string;
  meta?: string;
}

export interface SubheadingBlock {
  type: "subheading";
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BulletListBlock {
  type: "list";
  style?: "bullet";
  items: string[];
}

export interface KeyValueItem {
  label: string;
  value: string;
}

export interface KeyValueListBlock {
  type: "list";
  style: "keyvalue";
  items: KeyValueItem[];
}

export type Block =
  | SectionBlock
  | HeadingBlock
  | SubheadingBlock
  | ParagraphBlock
  | BulletListBlock
  | KeyValueListBlock;

export interface ResumeData {
  profile: Profile;
  blocks: Block[];
}
