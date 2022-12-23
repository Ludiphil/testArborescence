import { XYCoord } from "react-dnd";
import { bound } from "../utils";

export function measureHover(el: HTMLElement, offset: XYCoord, indent: number) {
  const nextEl = el.nextElementSibling as HTMLElement;
  const prevEl = el.previousElementSibling as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = offset.x - rect.x;
  const y = offset.y - rect.y;
  const height = rect.height;
  const inTopHalf = y < height / 2;
  const inBottomHalf = !inTopHalf;
  const pad = height / 4;
  const inMiddle = y > pad && y < height - pad;
  const maxLevel = Number();
  const minLevel = Number();
  const level = bound(Math.floor(x / indent), minLevel, maxLevel);
  return { level, inTopHalf, inBottomHalf, inMiddle };
}

export type HoverData = ReturnType<typeof measureHover>;
