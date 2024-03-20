import React from "react";
import { Directions, ITail } from "./Ground";

type Props = {
  tail: ITail[];
  speed: number;
  direction: Directions;
  marginTop: number;
  marginLeft: number;
};

const Tail = ({ tail, speed, marginTop, marginLeft, direction }: Props) => {
  return tail.map((item: ITail, index: number) => {
    let topmargin = marginTop;
    let leftmargin = marginLeft;

    if (direction === "right") {
      leftmargin = marginLeft - index * 30;
    } else if (direction === "up") {
      topmargin = marginTop + index * 30;
    } else if (direction === "left") {
      leftmargin = marginLeft + index * 30;
    } else {
      topmargin = marginTop - index * 30;
    }

    // if (direction === "right") {
    //   new Promise((r) =>
    //     setInterval(
    //       () => r((leftmargin = marginLeft - index * 30)),
    //       speed * (index + 1)
    //     )
    //   );
    // } else if (direction === "up") {
    //   new Promise((r) =>
    //     setInterval(
    //       () => r((topmargin = marginTop + index * 30)),
    //       speed * (index + 1)
    //     )
    //   );
    // } else if (direction === "left") {
    //   new Promise((r) =>
    //     setInterval(
    //       () => r((leftmargin = marginLeft + index * 30)),
    //       speed * (index + 1)
    //     )
    //   );
    // } else {
    //   new Promise((r) =>
    //     setInterval(
    //       () => r((topmargin = marginTop - index * 30)),
    //       speed * (index + 1)
    //     )
    //   );
    // }

    return (
      <div
        className="ground_snake"
        style={{
          marginTop: topmargin,
          marginLeft: leftmargin,
        }}
      >
        <i className="snake_head" />
      </div>
    );
  });
};

export default Tail;
