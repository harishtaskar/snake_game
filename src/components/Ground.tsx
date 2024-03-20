"use client";
import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
//@ts-ignore
import ArrowKeysReact from "arrow-keys-react";
import { gameStatusAtom, scoreAtom, speedAtom, userAtom } from "../state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
// import Tail from "./Tail";

export enum Directions {
  up = "up",
  down = "down",
  right = "right",
  left = "left",
}

export interface ITail {
  left: number;
  top: number;
}

const Ground = () => {
  const [marginTop, setMarginTop] = useState<number>(30);
  const [marginLeft, setMarginLeft] = useState<number>(30);
  const [game, setGame] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useRecoilState<boolean>(
    gameStatusAtom || false
  );
  const [direction, setDirection] = useState<Directions>(Directions.right);
  const speed = useRecoilValue(speedAtom);
  const [score, setScore] = useRecoilState(scoreAtom);
  const player = useRecoilValue(userAtom);
  const [tail, setTail] = useState<ITail[]>([]);
  const [snakeScale, setSnakeScale] = useState<number>(1);
  let groundRef = useRef(null);

  const [appleMargins, setAppleMargins] = useState({
    left: 150,
    top: 150,
  });

  // checking weather username is exists or not

  const onGameHandler = useCallback(() => {
    if (player.name !== "") {
      setGame((prev) => !prev);
    } else {
      toast.error("Please Add Your Name");
    }
  }, [player]);

  //Adding New Score in Database

  useEffect(() => {
    const updateScore = async () => {
      await fetch(`/api/score/update`, {
        method: "POST",
        body: JSON.stringify({
          name: player.name,
          speed: speed,
          score: score,
        }),
      });
    };

    if (isGameOver && score > 0) {
      updateScore();
    }
  }, [isGameOver, score]);

  //Getting outside click of ground
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      //@ts-ignore
      if (groundRef?.current && !groundRef?.current?.contains(event.target)) {
        setGame(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [groundRef]);

  //Getting Random position for apple
  function getRandomValues(): number[] {
    const left: number = Math.floor(Math.random() * (1170 / 30 - 1) + 1) * 30;
    const top: number = Math.floor(Math.random() * (870 / 30 - 1) + 1) * 30;
    return [left, top];
  }

  //Spacebar key press event
  const handleSpaceBtn = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.keyCode === 32) {
        setGame((prev) => !prev);
      }
    },
    [game]
  );

  //Arrow-Key Events
  ArrowKeysReact.config({
    left: () => {
      setDirection(Directions.left);
    },
    right: () => {
      setDirection(Directions.right);
    },
    up: () => {
      setDirection(Directions.up);
    },
    down: () => {
      setDirection(Directions.down);
    },
  });

  useEffect(() => {
    if (!game) {
      return;
    }

    let interval = setInterval(() => {
      switch (direction) {
        case "right":
          setMarginLeft((prev) => {
            if (prev >= 1170) {
              setIsGameOver(true);
              setGame(false);
              clearInterval(interval);
              return prev;
            } else {
              return prev + 30;
            }
          });
          break;
        case "down":
          setMarginTop((prev) => {
            if (prev >= 870) {
              setIsGameOver(true);
              setGame(false);
              clearInterval(interval);
              return prev;
            } else {
              return prev + 30;
            }
          });
          break;
        case "left":
          setMarginLeft((prev) => {
            if (prev <= 0) {
              setIsGameOver(true);
              setGame(false);
              clearInterval(interval);
              return prev;
            } else {
              return prev - 30;
            }
          });
          break;
        case "up":
          setMarginTop((prev) => {
            if (prev <= 0) {
              setIsGameOver(true);
              setGame(false);
              clearInterval(interval);
              return prev;
            } else {
              return prev - 30;
            }
          });
          break;

        default:
          break;
      }
    }, speed);

    return () => {
      if (game) {
        clearInterval(interval);
        if (isGameOver) {
          setMarginLeft(30);
          setMarginTop(30);
          setIsGameOver(false);
          setDirection(Directions.right);
          setScore(0);
        }
      }
    };
  }, [game, direction]);

  //Check if both Snake and apple get intersact
  if (appleMargins.left === marginLeft) {
    if (appleMargins.top === marginTop) {
      setSnakeScale(1.2);
      setTimeout(() => {
        setSnakeScale(1);
        setTail((prev) => [...prev, { left: marginLeft, top: marginTop }]);
      }, 100);
      const [left, top] = getRandomValues();
      setAppleMargins({
        left: left,
        top: top,
      });
      setScore((prev) => prev + 50);
    }
  }

  return (
    <div onKeyDown={handleSpaceBtn}>
      <div
        className="ground"
        {...ArrowKeysReact.events}
        tabIndex={"1"}
        ref={groundRef}
      >
        <div
          className="ground_snake"
          style={{
            marginTop: marginTop,
            marginLeft: marginLeft,
            scale: snakeScale,
          }}
        >
          <i className="snake_head" />

          {/* <i className="snake_tail" />
        <i className="snake_tail" />
        <i className="snake_tail" /> */}
        </div>
        {/* {tail.map((item: ITail, index: number) => {
          return (
            <Tail
              direction={direction}
              marginLeft={marginLeft}
              marginTop={marginTop}
              speed={speed}
              tail={tail}
              key={index}
            />
          );
        })} */}

        <div className="ground_buttons" onClick={onGameHandler}>
          {isGameOver && <span>Game Over</span>}
          {!game && !isGameOver && <span>Play</span>}
          {game ? (
            <FaRegPauseCircle
              className="buttons_btn"
              style={game ? { display: "none" } : {}}
            />
          ) : (
            <FaRegPlayCircle className="buttons_btn" />
          )}
        </div>
        <div
          className="ground_apple"
          style={{
            marginTop: appleMargins.top,
            marginLeft: appleMargins.left,
          }}
        >
          <i className="apple" />
        </div>
      </div>
    </div>
  );
};

export default Ground;
