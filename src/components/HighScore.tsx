"use client";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useRecoilValue } from "recoil";
import { gameStatusAtom } from "@/state";
import { FaShield } from "react-icons/fa6";

type Score = {
  name: string;
  score: number;
  speed: string;
};

const HighScore = () => {
  const isGameOver: boolean = useRecoilValue(gameStatusAtom);
  const [scorelist, setScoreList] = useState<Score[]>([]);

  const fetchScores = async () => {
    const response = await fetch(`/api/score`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setScoreList(data);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    if (isGameOver) {
      fetchScores();
    }
  }, [isGameOver]);

  return (
    <div className="highscore">
      <span className="label">High Score</span>
      <div style={{ width: "100%" }}>
        <ul className="list">
          {scorelist?.map((item: Score, index: number) => {
            return (
              <li className="item" key={index}>
                <div className="div">
                  <span className="rank">{index + 1}</span>
                  <span className="name">{item.name}</span>
                </div>
                {index < 2 && (
                  <FaShield
                    style={
                      index === 0
                        ? { color: "var(--gold)" }
                        : {} || index === 1
                        ? { color: "var(--silver)" }
                        : {} || { color: "var(--bronz)" }
                    }
                  />
                )}
                <div className="div">
                  <span className="score1">{item.score}</span>
                  <span className="speed1">{item.speed}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HighScore;
