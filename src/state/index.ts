import { atom } from "recoil";

export enum Speed {
  slow = 240,
  medium = 160,
  fast = 90,
  super_fast = 50,
}

export const speedAtom = atom<Speed>({
  key: "speed-state",
  default: Speed.slow,
});

export const scoreAtom = atom<number>({
  key: "score-state",
  default: 0,
});

