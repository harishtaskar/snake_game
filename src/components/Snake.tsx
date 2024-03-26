import React, { CSSProperties } from "react";
import { Directions, ISnake } from "./Ground";
import { snakeHeight, snakeWidth } from "@/config";

type Props = {
  snake: ISnake;
  speed: number;
  direction: Directions;
  marginTop: number;
  marginLeft: number;
  scale: number;
  index: number;
};

const Snake = ({
  snake,
  speed,
  marginTop,
  marginLeft,
  direction,
  scale,
  index,
}: Props) => {
  let topmargin = marginTop;
  let leftmargin = marginLeft;
  // let delay = speed * (index + 1);

  if (direction === "right") {
    leftmargin = marginLeft - index * snakeWidth;
  } else if (direction === "up") {
    topmargin = marginTop + index * snakeHeight;
  } else if (direction === "left") {
    leftmargin = marginLeft + index * snakeWidth;
  } else {
    topmargin = marginTop - index * snakeHeight;
  }

  return (
    <i
      key={index}
      className="snake_head"
      style={{
        marginTop: topmargin,
        marginLeft: leftmargin,
        scale: scale,
        width: snakeWidth,
        height: snakeHeight,
      }}
    />
  );
};

export default Snake;
