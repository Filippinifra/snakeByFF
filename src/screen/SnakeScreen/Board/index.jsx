import React, { useMemo, useState, useEffect } from "react";

import { Dimensions, AsyncStorage } from "react-native";
import { N_COL, N_ROW } from "config/snakeConfig";
import { RowWrapper, Square } from "./styles";
import {
  INITIAL_APPLE_COLOR,
  INITIAL_HEAD_COLOR,
  INITIAL_TAIL_COLOR,
} from "config/snakeConfig";
import { useNavigation } from "@react-navigation/native";

const getColor = async (setColor, element) => {
  try {
    const color = await AsyncStorage.getItem(element);
    setColor(JSON.parse(color));
  } catch (error) {
    console.log(error);
  }
};

const Board = ({ headPosition, applePosition, tail }) => {
  const [colorHead, setColorHead] = useState(null);
  const [colorTail, setColorTail] = useState(null);
  const [colorApple, setColorApple] = useState(null);

  const navigation = useNavigation();

  const updateColors = () => {
    getColor(setColorHead, "headColor");
    getColor(setColorTail, "tailColor");
    getColor(setColorApple, "appleColor");
  };

  useEffect(() => {
    updateColors();
  }, []);

  useEffect(() => {
    const onRenderBoard = navigation.addListener("focus", () => {
      updateColors();
    });

    return onRenderBoard;
  }, [navigation]);

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
              headColor={colorHead || INITIAL_HEAD_COLOR}
              tailColor={colorTail || INITIAL_TAIL_COLOR}
              appleColor={colorApple || INITIAL_APPLE_COLOR}
            />
          );
        })
      )}
    </RowWrapper>
  );
};

export { Board };
