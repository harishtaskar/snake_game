"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Speed, speedAtom, scoreAtom, userAtom, User } from "../state";
import HighScore from "./HighScore";
import { toast } from "react-toastify";
import { PORT } from "@/config";

type Props = {};

const Menu = ({}: Props) => {
  const setSpeed = useSetRecoilState(speedAtom);
  const score = useRecoilValue(scoreAtom);
  const [player, setPlayer] = useRecoilState<User>(userAtom);
  const [user, setUser] = useState("");

  useEffect(() => {
    const existingUser = localStorage.getItem("user") || "";
    if (existingUser !== "") {
      setPlayer(JSON.parse(existingUser));
    }
  }, []);

  console.log(player);

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

  const addPlayerHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setTimeout(async () => {
        const response = await fetch(`${PORT}/score/new`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: user.toLowerCase().trim(),
            speed: "slow",
          }),
        });
        const data: any = await response.json();
        if (data.res === "ok") {
          setPlayer(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          toast.error(data.msg);
        }
      }, 1000);
    },
    [user]
  );

  return (
    <div className="menu">
      <div className="player">
        <span className="player_label">Player</span>
        {player.name ? (
          <span className="player_name">{player.name}</span>
        ) : (
          <form className="player_form" onSubmit={addPlayerHandler}>
            <input
              className="player_input"
              type="text"
              name="name"
              id="name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="off"
            />
            <button className="player_btn">Add</button>
          </form>
        )}
      </div>
      <div className="score">
        <span className="score_label">Score</span>
        <span className="score_value">{score || 0}</span>
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
