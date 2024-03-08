export interface TreeNode {
  id?: number,
  branch_id?: number,
  name: string;
  desc?: string;
  isExpanded?: boolean;
  emoji?: string;
  disabled?: boolean;
  is_hidden?: boolean;
  isActivated?: boolean;
  children?: TreeNode[];
}

export type LinkTypesProps = {
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};