import React from "react";
import "./index.scss";

type Props = {};

const HighScore = ({}: Props) => {
  return (
    <div className="highscore">
      <span className="label">High Score</span>
      <ul className="list">
        <li className="item">
          <div className="div">
            <span className="rank">1</span>
            <span className="name">Name</span>
          </div>
          <div className="div">
            <span className="score1">Score</span>
            <span className="speed1">speed</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HighScore;
