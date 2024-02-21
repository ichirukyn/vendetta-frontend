export interface TreeNode {
  name: string;
  isExpanded?: boolean;
  emoji?: string;
  disabled?: boolean;
  isActivated?: boolean;
  children?: TreeNode[];
}

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};