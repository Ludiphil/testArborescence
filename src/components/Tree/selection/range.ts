export class Range {
  constructor(public start: number, public end: number) {
    if (this.start > this.end) {
      throw new Error("Invalid range: start larger than end");
    }
  }

  serialize(): [number, number] {
    return [this.start, this.end];
  }

  contains(n: number) {
    return n >= this.start && n <= this.end;
  }

  overlaps(r: Range) {
    return this.contains(r.start - 1) || this.contains(r.end + 1);
  }

  combine(r: Range) {
    this.start = Math.min(this.start, r.start);
    this.end = Math.max(this.end, r.end);
  }

  get size() {
    return this.end - this.start + 1;
  }

  clone() {
    return new Range(this.start, this.end);
  }

  map(fn: (index: any) => string): any {
    let res = [];
    for (let i = this.start; i <= this.end; i++) res.push(fn(i));
    return res;
  }

  isEqual(other: Range) {
    return this.start === other.start && this.end === other.end;
  }
}
