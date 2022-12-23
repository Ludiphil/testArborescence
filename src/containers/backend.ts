import { useCallback, useMemo, useState, useEffect } from "react";
import TreeModel from "tree-model-improved";
import lineage from "./lineage";

function findById(node: any, id: string): TreeModel.Node<any> | null {
  return node.first((n: any) => n.model.id === id);
}

const initData = lineage;

export type MyData = {
  id: string;
  isOpen: boolean;
  name: string;
  children?: MyData[];
};

export function useBackend() {
  const [data, setData] = useState<MyData>(initData as MyData);
  const root = useMemo(() => new TreeModel().parse(data), [data]);
  const find = useCallback((id) => findById(root, id), [root]);
  const update = () => setData({ ...root.model });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return {
    data,
    onMove: (
      srcIds: string[],
      dstParentId: string | null,
      dstIndex: number
    ) => {
      const dstParent = dstParentId ? find(dstParentId) : root;
      for (let srcId of srcIds) {
        const srcNode = find(srcId);
        if (!srcNode || !dstParent) return;
        const newItem = new TreeModel().parse(srcNode.model);
        dstParent.addChildAtIndex(newItem, dstIndex);
        srcNode.drop();
      }
      update();
    },
    onToggle: (id: string, isOpen: boolean) => {
      const node = find(id);
      if (node) {
        node.model.isOpen = isOpen;
        update();
      }
    },
    onEdit: (id: string, name: string) => {
      const node = find(id);
      if (node) {
        node.model.name = name;
        update();
      }
    }
  };
}
