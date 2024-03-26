"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import "./index.scss";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
//@ts-ignore
import ArrowKeysReact from "arrow-keys-react";
import {
  Speed,
  gameStatusAtom,
  scoreAtom,
  speedAtom,
  userAtom,
} from "../state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import Snake from "./Snake";
import {
  PORT,
  appleHeight,
  appleWidth,
  canvasHeight,
  canvasWidth,
  snakeHeight,
  snakeWidth,
} from "@/config";
// import snake from "./snake";

export enum Directions {
  up = "up",
  down = "down",
  right = "right",
  left = "left",
}

export interface ISnake {
  left: number;
  top: number;
}

const Ground = () => {
  const [marginTop, setMarginTop] = useState<number>(20);
  const [marginLeft, setMarginLeft] = useState<number>(20);
  const [game, setGame] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useRecoilState<boolean>(
    gameStatusAtom || false
  );
  const [direction, setDirection] = useState<Directions>(Directions.right);
  const speed = useRecoilValue(speedAtom);
  const [score, setScore] = useRecoilState(scoreAtom);
  const player = useRecoilValue(userAtom);
  const [snake, setSnake] = useState<ISnake[]>([
    { left: marginLeft, top: marginTop },
  ]);
  const [snakeScale, setSnakeScale] = useState<number>(1);
  let groundRef = useRef(null);

  const [appleMargins, setAppleMargins] = useState({
    left: 100,
    top: 100,
  });

  // checking weather username is exists or not

  const onGameHandler = useCallback(() => {
    setGame((prev) => !prev);
    // if (player.name !== "") {
    // } else {
    //   toast.error("Please Add Your Name");
    // }
  }, [player]);

  const speedCalc: string = useMemo(() => {
    switch (speed) {
      case 50:
        return "super_fast";
      case 100:
        return "fast";
      case 150:
        return "medium";
      default:
        return "slow";
    }
  }, [speed]);

  //Adding New Score in Database

  useEffect(() => {
    const updateScore = async () => {
      await fetch(`${PORT}/score/update`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: player.name,
          speed: speedCalc,
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
    const left: number =
      Math.floor(Math.random() * (canvasWidth / snakeWidth - 1) + 1) * 20;
    const top: number =
      Math.floor(Math.random() * (canvasHeight / snakeHeight - 1) + 1) * 20;
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

  const speedIncreaser = useMemo(() => {
    let increaser;
    switch (speed) {
      case 50:
        increaser = score / Speed.slow;
        break;
      case 100:
        increaser = score / Speed.fast;
        break;
      case 150:
        increaser = score / Speed.super_fast;
        break;
      default:
        increaser = score / Speed.super_fast;
        break;
    }
    return increaser;
  }, [score]);

  useEffect(() => {
    if (!game) {
      return;
    }

    let interval = setInterval(() => {
      switch (direction) {
        case "right":
          setMarginLeft((prev) => {
            if (prev >= canvasWidth - snakeWidth) {
              setIsGameOver(true);
              setGame(false);
              clearInterval(interval);
              return prev;
            } else {
              return prev + snakeWidth;
            }
          });
          break;
        case "down":
          setMarginTop((prev) => {
            if (prev >= canvasHeight - snakeHeight) {
              setIsGameOver(true);
              setGame(false);
              clearInterval(interval);
              return prev;
            } else {
              return prev + snakeHeight;
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
              return prev - snakeWidth;
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
              return prev - snakeHeight;
            }
          });
          break;

        default:
          break;
      }
    }, speed - speedIncreaser);

    return () => {
      if (game) {
        clearInterval(interval);
        if (isGameOver) {
          setMarginLeft(snakeWidth);
          setMarginTop(snakeHeight);
          setIsGameOver(false);
          setDirection(Directions.right);
          setScore(0);
        }
      }
    };
  }, [game, direction, speedIncreaser]);

  //Check if both Snake and apple get intersact
  if (appleMargins.left === marginLeft) {
    if (appleMargins.top === marginTop) {
      setSnakeScale(1.2);
      setTimeout(() => {
        setSnakeScale(1);
        // setSnake((prev) => [...prev, { left: marginLeft, top: marginTop }]);
      }, 100);
      const [left, top] = getRandomValues();
      setAppleMargins({
        left: left,
        top: top,
      });
      setScore((prev) => prev + 50);
      console.log(speedIncreaser);
    }
  }

  return (
    <div onKeyDown={handleSpaceBtn}>
      <div
        className="ground"
        {...ArrowKeysReact.events}
        tabIndex={"1"}
        ref={groundRef}
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        <div
          className="ground_snake"
          style={{ width: snakeWidth, height: snakeHeight }}
        >
          {snake.map((item: ISnake, index: number) => {
            return (
              <Snake
                direction={direction}
                marginLeft={marginLeft}
                marginTop={marginTop}
                speed={speed}
                snake={item}
                key={index}
                index={index}
                scale={snakeScale}
              />
            );
          })}
        </div>
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
          <i
            className="apple"
            style={{
              width: appleWidth,
              height: appleHeight,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Ground;
