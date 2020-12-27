import styled from "styled-components";
import { SQUARE_COLOR, BORDER_COLOR, N_COL, N_ROW } from "config/snakeConfig";

export const RowWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Square = styled.View`
  border-color: ${BORDER_COLOR};
  border-width: 1px;
  width: ${({ smallestSize }) => Math.trunc(smallestSize / N_COL)}px;
  height: ${({ smallestSize }) => Math.trunc(smallestSize / N_ROW)}px;
  background-color: ${({
    isHeadBox,
    isAppleBox,
    isTailBox,
    headColor,
    tailColor,
    appleColor,
  }) =>
    isHeadBox
      ? headColor
      : isAppleBox
      ? appleColor
      : isTailBox
      ? tailColor
      : SQUARE_COLOR};
`;
