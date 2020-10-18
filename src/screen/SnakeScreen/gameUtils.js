import { swipeDirections } from "react-native-swipe-gestures";
import { N_COL, N_ROW } from "config/snakeConfig";
import _ from "lodash";
import { AsyncStorage } from "react-native";

const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

export const moveHead = (
  direction,
  setHeadCol,
  setHeadRow,
  headCol,
  headRow
) => {
  switch (direction) {
    case "left":
      headCol === 0 ? setHeadCol(N_COL - 1) : setHeadCol(headCol - 1);
      break;
    case "right":
      headCol === N_COL - 1 ? setHeadCol(0) : setHeadCol(headCol + 1);
      break;
    case "top":
      headRow === 0 ? setHeadRow(N_ROW - 1) : setHeadRow(headRow - 1);
      break;
    case "bottom":
      headRow === N_ROW - 1 ? setHeadRow(0) : setHeadRow(headRow + 1);
      break;
  }
};

export const moveTail = (isEating, oldPositionHead, tail, setTail) => {
  if (isEating) {
    setTail([oldPositionHead].concat(tail));
  } else if (tail.length) {
    setTail([oldPositionHead].concat(tail.slice(0, -1)));
  }
};

export const changeApplePosition = (setApple, tail, head) => {
  const headAndTailBoxes = tail.concat([head]);
  const newApplePosition = getRandomFreeBox(headAndTailBoxes);
  setApple(newApplePosition);
};

export const onSwipe = (gestureName, direction, setDirection) => {
  switch (gestureName) {
    case SWIPE_UP:
      if (direction !== "bottom") {
        setDirection("top");
      }
      break;
    case SWIPE_DOWN:
      if (direction !== "top") {
        setDirection("bottom");
      }
      break;
    case SWIPE_LEFT:
      if (direction !== "right") {
        setDirection("left");
      }
      break;
    case SWIPE_RIGHT:
      if (direction !== "left") {
        setDirection("right");
      }
      break;
  }
};

export const getRandomFreeBox = (arrayBoxOccupied) => {
  const arrayIndexBoxOccupied = arrayBoxOccupied.map(
    (value) => value[0] * N_ROW + value[1]
  );
  const arrayAllBoxes = _.range(0, N_COL * N_ROW - 1);
  const arrayFreeBox = _.difference(arrayAllBoxes, arrayIndexBoxOccupied);
  const elementNumberRandom =
    arrayFreeBox[Math.floor(Math.random() * arrayFreeBox.length)];
  return [Math.trunc(elementNumberRandom / N_COL), elementNumberRandom % N_COL];
};

export const storeScore = async (score) => {
  try {
    await AsyncStorage.setItem("highScore", JSON.stringify(score));
  } catch (error) {
    console.log(error);
  }
};

export const getScore = async (setHighScore) => {
  try {
    const score = await AsyncStorage.getItem("highScore");
    setHighScore(score);
  } catch (error) {}
};
