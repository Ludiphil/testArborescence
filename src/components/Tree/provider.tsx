import React, {
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef
} from "react";
import { FixedSizeList } from "react-window";
import { TreeApiContext } from "./context";
import { IdObj, StateContext, TreeProviderProps } from "./types";
import { TreeApi } from "./tree-api";
import { actions, initState, reducer } from "./reducer";
import { useSelectionKey } from "./selection/selection-hook";

const TreeViewProvider = <T extends IdObj>(props: TreeProviderProps<T>) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initState());
  const list = useRef<FixedSizeList | null>(null);
  const listEl = useRef<HTMLDivElement | null>(null);

  const api = useMemo(
    () => new TreeApi<T>(dispatch, state as StateContext, props, list, listEl),
    [dispatch, state, props, list, listEl]
  );

  useLayoutEffect(() => {
    // @ts-ignore
    dispatch(actions.setVisibleIds(api.visibleIds, api.idToIndex));
  }, [dispatch, api.visibleIds, api.idToIndex, props.root]);

  useImperativeHandle(props.imperativeHandle, () => api);
  useSelectionKey(listEl, api);

  return (
    <TreeApiContext.Provider value={api}>
      {props.children}
    </TreeApiContext.Provider>
  );
};

export default TreeViewProvider;
