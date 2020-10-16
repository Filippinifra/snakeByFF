import React, { useMemo } from "react";

import { Dimensions } from "react-native";
import { N_COL, N_ROW } from "screen/SnakeScreen/snakeConfig";
import { RowWrapper, Square } from "./styles";

const Board = ({ headPosition, applePosition, tail }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const smallestSize = useMemo(() => Math.min(windowHeight, windowWidth), [
    windowHeight,
    windowWidth,
  ]);

  return (
    <RowWrapper>
      {[...Array(N_ROW)].map((v, indexRow) =>
        [...Array(N_COL)].map((v, indexCol) => {
          const isTailBox = tail.some(
            (tailElement) =>
              tailElement[0] === indexRow && tailElement[1] === indexCol
          );
          const isHeadBox =
            headPosition[0] === indexRow && headPosition[1] === indexCol;
          const isAppleBox =
            applePosition[0] === indexRow && applePosition[1] === indexCol;
          return (
            <Square
              smallestSize={smallestSize}
              isAppleBox={isAppleBox}
              isHeadBox={isHeadBox}
              isTailBox={isTailBox}
              key={`square-${indexRow}-${indexCol}`}
            />
          );
        })
      )}
    </RowWrapper>
  );
};

export { Board };
