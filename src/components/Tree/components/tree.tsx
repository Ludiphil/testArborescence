import React, { forwardRef, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import enrichTree from "../data/enrichTree";
import { TreeApi } from "../tree-api";
import { IdObj, TreeProps, Node } from "../types";
import List from "./list";
import TreeViewProvider from "../provider";
import { Preview } from "./preview";
import OuterDrop from "./outer-drop";

export const Tree = forwardRef(
  <T extends IdObj>(props: TreeProps<T>, ref: React.Ref<TreeApi<T>>) => {
    const root = useMemo<Node<T>>(
      () =>
        enrichTree<T>(
          props.data,
          props.hideRoot,
          props.getChildren,
          props.isOpen,
          props.disableDrag,
          props.disableDrop,
          props.openByDefault
        ),
      [
        props.data,
        props.hideRoot,
        props.getChildren,
        props.isOpen,
        props.disableDrag,
        props.disableDrop,
        props.openByDefault
      ]
    );

    return (
      <TreeViewProvider treeProps={props} imperativeHandle={ref} root={root}>
        <DndProvider
          backend={HTML5Backend}
          options={{ rootElement: props?.dndRootElement }}
        >
          <OuterDrop>
            <List className={props.className} />
          </OuterDrop>
          <Preview />
        </DndProvider>
      </TreeViewProvider>
    );
  }
);
