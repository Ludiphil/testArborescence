import { Node } from "./types";

export function bound(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

export function isFolder(node: Node<any>) {
  return !!node.children;
}

export function isItem(node: Node | null) {
  return node && !isFolder(node);
}

export function isClosed(node: Node | null) {
  return node && isFolder(node) && !node.isOpen;
}

/**
 * Is first param a decendent of the second param
 */
export function isDecedent(a: Node, b: Node) {
  let n: Node | null = a;
  while (n) {
    if (n.id === b.id) return true;
    n = n.parent;
  }
  return false;
}

export function indexOf(node: Node): number {
  if (!node.parent) throw Error("Node does not have a parent");
  return node.parent.children?.findIndex((item) => item.id === node.id);
}

export function noop() {}
