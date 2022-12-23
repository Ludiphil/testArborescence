import makeTree from "../data/make-tree";

const data = `
level1
 level2-1
  level3-1
  level3-2
 level-2
  level3-3
`;

describe("data - make-tree.js", () => {
  it("Should output a valid tree structure", () => {
    const root = makeTree(data);
  });
});
