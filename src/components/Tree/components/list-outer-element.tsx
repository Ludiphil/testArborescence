import React from "react";
import { useTreeApi } from "../context";
import DropCursor from "./drop-cursor";

const ListOuterElement = React.forwardRef(
  (
    props: React.HTMLProps<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { children, ...rest } = props;
    const tree = useTreeApi();

    return (
      <div
        ref={ref}
        onClick={tree.onClick}
        onContextMenu={tree.onContextMenu}
        {...rest}
      >
        <div
          style={{
            height: tree.visibleNodes.length * tree.rowHeight,
            width: "100%",
            overflow: "hidden",
            position: "absolute",
            left: "0",
            right: "0"
          }}
        >
          <DropCursor />
        </div>
        {children}
      </div>
    );
  }
);

export default ListOuterElement;
