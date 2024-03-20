import { atom } from "recoil";

export enum Speed {
  slow = 240,
  medium = 160,
  fast = 90,
  super_fast = 50,
}

export type User = {
  name: string;
  speed: string;
  score: number;
};

export const speedAtom = atom<Speed>({
  key: "speed-state",
  default: Speed.slow,
});

export const scoreAtom = atom<number>({
  key: "score-state",
  default: 0,
});

export const gameStatusAtom = atom<boolean>({
  key: "game-status-state",
  default: false,
});

export const userAtom = atom<User>({
  key: "user-state",
  default: { name: "", score: 0, speed: "slow" },
});
