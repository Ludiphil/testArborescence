import { Node } from "../types";

function flattenTree<T>(root: Node<T>): Node<T>[] {
  const list: Node<T>[] = [];
  let index = 0;
  function traverse(node: Node<T>) {
    if (node.level >= 0) {
      node.rowIndex = index++;
      list.push(node);
    }
    if (node.isOpen) {
      node.children?.forEach(traverse);
    }
  }
  traverse(root);
  return list;
}

export default flattenTree;
