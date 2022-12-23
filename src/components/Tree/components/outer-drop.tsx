import { ReactElement } from "react";
import { useOuterDrop } from "../dnd/outer-drop-hook";

function OuterDrop(props: { children: ReactElement }) {
  useOuterDrop();
  return props?.children;
}

export default OuterDrop;
