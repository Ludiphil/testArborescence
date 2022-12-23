import { FixedSizeList } from "react-window";
import { useTreeApi } from "../context";
import Row from "./row";
import ListOuterElement from "./list-outer-element";

function List(props: { className?: string }) {
  const tree = useTreeApi();
  return (
    <div style={{ height: tree.height, width: tree.width, overflow: "hidden" }}>
      <FixedSizeList
        className={props.className}
        outerRef={tree.listEl}
        itemCount={tree.visibleNodes.length}
        height={tree.height}
        width={tree.width}
        itemSize={tree.rowHeight}
        itemKey={(index) => tree.visibleNodes[index]?.id || index}
        outerElementType={ListOuterElement}
        ref={tree.list}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}

export default List;
