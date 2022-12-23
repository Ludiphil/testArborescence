import { Selection } from "../selection/selection";

const createSelection = (...ranges) => {
  return Selection.parse(
    { ranges },
    Array.from(Array(100), (_, i) => i)
  );
};

describe("select", () => {
  it("Should select one after end", () => {
    const s = createSelection([0, 0]);
    s.multiSelect(1);
    expect(s.getRanges()).toEqual([[0, 1]]);
    expect(s.direction).toEqual("forward");
  });
  it("Should select one before start", () => {
    const s = createSelection([1, 1]);
    s.multiSelect(0);
    expect(s.getRanges()).toEqual([[0, 1]]);
    expect(s.direction).toEqual("backward");
  });
  it("Should select between two ranges", () => {
    const s = createSelection([0, 0], [2, 2]);
    s.multiSelect(1);
    expect(s.getRanges()).toEqual([[0, 2]]);
    expect(s.direction).toEqual("forward");
  });
  it("Should select new spot", () => {
    const s = createSelection([0, 0]);
    s.multiSelect(5);
    expect(s.getRanges()).toEqual([
      [0, 0],
      [5, 5]
    ]);
    expect(s.direction).toEqual("none");
  });
});

describe("deselect", () => {
  it("Should delete one", () => {
    const s = createSelection([0, 0]);
    s.deselect(0);
    expect(s.getRanges()).toStrictEqual([]);
  });
  it("Should start of a range", () => {
    const s = createSelection([0, 5]);
    s.deselect(0);
    expect(s.getRanges()).toEqual([[1, 5]]);
  });

  it("Should end of a range", () => {
    const s = createSelection([0, 5]);
    s.deselect(5);
    expect(s.getRanges()).toEqual([[0, 4]]);
  });

  it("Should between a range", () => {
    const s = createSelection([0, 5]);
    s.deselect(3);
    expect(s.getRanges()).toEqual([
      [0, 2],
      [4, 5]
    ]);
  });
});

describe("extend", () => {
  it("Should up", () => {
    const s = createSelection();
    s.multiSelect(5);
    s.extend(6);
    expect(s.getRanges()).toEqual([[5, 6]]);
  });
  it("Should down", () => {
    const s = createSelection();
    s.multiSelect(5);
    s.extend(4);
    expect(s.getRanges()).toEqual([[4, 5]]);
  });
  it("Should around anchor", () => {
    const s = createSelection([5, 10]);
    s.extend(1);
    expect(s.getRanges()).toEqual([[1, 5]]);
  });
  it('Should "through other ranges', () => {
    const s = createSelection([0, 0], [5, 5], [9, 10]);
    s.multiSelect(2);
    s.extend(20);
    expect(s.getRanges()).toEqual([
      [0, 0],
      [2, 20]
    ]);
  });
  it("Should clicking backward", () => {
    const s = createSelection([15, 15]);
    s.extend(3);
    expect(s.getRanges()).toEqual([[3, 15]]);
  });
  it("Should split range then extend", () => {
    const s = createSelection([5, 10]);
    s.deselect(8);
    expect(s.currentIndex).toBe(1);
    expect(s.getRanges()).toEqual([
      [5, 7],
      [9, 10]
    ]);
  });
});
