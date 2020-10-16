import styled from "styled-components";
import { N_COL, N_ROW } from "screen/SnakeScreen/snakeConfig";
import {
  APPLE_COLOR,
  HEAD_COLOR,
  SQUARE_COLOR,
  TAIL_COLOR,
} from "screen/SnakeScreen/snakeConfig";

export const RowWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Square = styled.View`
  border-color: lightgray;
  border-width: 1px;
  width: ${({ smallestSize }) => Math.trunc(smallestSize / N_COL)}px;
  height: ${({ smallestSize }) => Math.trunc(smallestSize / N_ROW)}px;
  background-color: ${({ isHeadBox, isAppleBox, isTailBox }) =>
    isHeadBox
      ? HEAD_COLOR
      : isAppleBox
      ? APPLE_COLOR
      : isTailBox
      ? TAIL_COLOR
      : SQUARE_COLOR};
`;
