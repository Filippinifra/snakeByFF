import styled from "styled-components";
import { Icon } from "react-native-elements";

export const LogoImg = styled.Image`
  margin-top: 4px;
  height: 30px;
  width: 30px;
`;

export const CentralContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  position: relative;
  height: ${({ height }) => height / 2}px;
`;

export const TopContainer = styled.View`
  height: 25%;
  position: absolute;
  justify-content: center;
  align-self: center;
  flex-direction: row;
`;

export const BottomContainer = styled.View`
  height: 25%;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-self: center;
  align-items: center;
`;

export const MiddleContainer = styled.View`
  width: 50%;
  align-content: center;
  justify-content: center;
`;

export const ScoreText = styled.Text`
  color: black;
  font-size: 30px;
  align-self: center;
`;

export const IconPlay = styled(Icon)`
  border-color: #007df7;
  border-width: 3px;
  border-radius: 100px;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const LogoContainer = styled.View`
  height: 50px;
  width: 50px;
  background-color: #007df7;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

export const PoweredLabel = styled.Text`
  color: #007df7;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const CurrentScoreContainer = styled.View`
  justify-content: center;
  margin-left: 30px;
  align-self: center;
  align-items: center;
  width: 50px;
`;

export const HighScoreContainer = styled.View`
  justify-content: center;
  margin-left: 30px;
  align-self: center;
  align-items: center;
`;

export const RightTopContainer = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
`;
