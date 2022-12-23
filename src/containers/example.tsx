import "./example.css";
import { GotLineage } from "./got";

export default function App() {
  const code = `
<Tree
  ref={(tree: TreeApi) => {
    // @ts-ignore
    global.tree = tree;
  }}
  className="react-aborist"
  data={backend.data}
  getChildren="children"
  isOpen="isOpen"
  disableDrop={(d) => d.name === "House Arryn"}
  hideRoot
  indent={24}
  onMove={backend.onMove}
  onToggle={backend.onToggle}
  onEdit={backend.onEdit}
  rowHeight={22}
  width={props.width}
  height={props.height}
  onClick={() => console.log("clicked the tree")}
  onContextMenu={() => console.log("context menu the tree")}
>
  {Node}
</Tree>              
  `;
  return (
    <div className="example">
      <main>
        <h1 draggable>React Arborist</h1>

        <section className="got-lineage">
          <GotLineage />
        </section>
        <code>
          <pre>{code}</pre>
        </code>
      </main>
    </div>
  );
}
