import { TreeNode } from "@/widgets";
import { TechniqueBranchType } from "@/shared/types";

export const createTechniqueTree = (data: TechniqueBranchType[], root: string) => {
  let node: TreeNode = { name: root, children: [] };
  
  for (let item of data) {
    if (item.parent?.name === root) {
      let child = createTechniqueTree(data, item.technique?.name || '')
      
      child.id = item.technique?.id;
      child.branch_id = item.id;
      child.desc = item.technique?.desc || '';
      node.children?.push(child)
    }
  }
  
  if (node.children?.length === 0) {
    delete node.children;
  }
  
  return node;
}
