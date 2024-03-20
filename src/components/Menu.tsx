"use client";
import React, { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Speed, speedAtom, scoreAtom } from "../state";
import HighScore from "./HighScore";

type Props = {};

const Menu = ({}: Props) => {
  const setSpeed = useSetRecoilState(speedAtom);
  const score = useRecoilValue(scoreAtom);
  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case "slow":
          setSpeed(Speed.slow);
          break;
        case "medium":
          setSpeed(Speed.medium);
          break;
        case "fast":
          setSpeed(Speed.fast);
          break;
        case "super_fast":
          setSpeed(Speed.super_fast);
          break;
      }
    },
    []
  );

  return (
    <div className="menu">
      <div className="score">
        <span className="score_label">Score</span>
        <span className="score_value">{score}</span>
      </div>

      <div className="speed">
        <label className="speed_label">Speed</label>
        <select className="speed_value" onChange={onChangeHandler}>
          <option value="slow">Slow</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
          <option value="super_fast">Super Fast</option>
        </select>
      </div>

      <HighScore />
    </div>
  );
};

export default Menu;
