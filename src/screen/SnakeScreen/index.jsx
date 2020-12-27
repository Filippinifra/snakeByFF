import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  Text,
  TouchableOpacity,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import _ from "lodash";
import { Board } from "components/Board";
import {
  INITIAL_SPEED,
  INITAL_DIRECTION,
  INITAL_POSITION,
} from "config/snakeConfig";
import { useInterval } from "hooks/useInterval";
import {
  getRandomFreeBox,
  moveHead,
  onSwipe,
  changeApplePosition,
  moveTail,
} from "screen/SnakeScreen/gameUtils";
import { PERSONAL_WEBSIT_URL } from "config/config";
import {
  BottomContainer,
  CentralContainer,
  CurrentScoreContainer,
  HighScoreContainer,
  IconPlay,
  LogoContainer,
  LogoImg,
  MiddleContainer,
  PoweredLabel,
  ScoreText,
  TopContainer,
  RightTopContainer,
} from "./styles";
import { getScore, storeScore } from "./gameUtils";
import { useEffect } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const SnakeScreen = () => {
  const [headRow, setHeadRow] = useState(INITAL_POSITION[0]);
  const [headCol, setHeadCol] = useState(INITAL_POSITION[1]);
  const [tail, setTail] = useState([]);
  const [direction, setDirection] = useState(INITAL_DIRECTION);
  const [apple, setApple] = useState(() =>
    getRandomFreeBox([headRow, headCol])
  );
  const [score, setScore] = useState(0);
  const [pause, setPause] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [directionChanged, setDirectionChanged] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    getScore(setHighScore);
  }, []);

  const windowHeight = Dimensions.get("window").height;

  const handleGameOver = () => {
    const isTailOverHead = tail.some(
      (tailElement) => tailElement[0] === headRow && tailElement[1] === headCol
    );
    if (isTailOverHead) {
      setHeadRow(INITAL_POSITION[0]);
      setHeadCol(INITAL_POSITION[1]);
      setTail([]);
      setDirection(INITAL_DIRECTION);
      setApple(getRandomFreeBox([[headRow, headCol]]));
      setPause(true);
      setSpeed(INITIAL_SPEED);
      if (score > highScore) {
        storeScore(score);
        setHighScore(score);
      }
      setScore(0);
      Alert.alert("GAME OVER", `Yuor score is ${score}`);
    }
  };

  const increaseSpeed = (isEating) => {
    const isNotJustStart = score !== 0;
    const isLevelUp = score % 10 === 0;
    if (isEating && isNotJustStart && isLevelUp) {
      setSpeed(INITIAL_SPEED - score * 3);
    }
  };

  const newTurn = () => {
    if (!pause) {
      const oldPositionHead = [headRow, headCol];
      moveHead(direction, setHeadCol, setHeadRow, headCol, headRow);
      const isEating = headRow === apple[0] && headCol === apple[1];
      moveTail(isEating, oldPositionHead, tail, setTail);
      if (isEating) {
        changeApplePosition(setApple, tail, [headRow, headCol]);
        setScore(score + 1);
      }
      increaseSpeed(isEating);
      handleGameOver();
      setDirectionChanged(false);
    }
  };

  const onPressSetting = () => {
    navigation.push("SnakeConfig");
    if (!pause) {
      setPause(true);
    }
  };

  useInterval(newTurn, pause ? null : speed);

  const redirectToWebsite = () => Linking.openURL(PERSONAL_WEBSIT_URL);

  return (
    <GestureRecognizer
      onSwipe={(newDirection) => {
        if (!directionChanged) {
          onSwipe(newDirection, direction, setDirection);
          setDirectionChanged(true);
        }
      }}
      config={{
        velocityThreshold: 0.5,
        directionalOffsetThreshold: 80,
      }}
      style={{ flex: 1 }}
    >
      <CentralContainer height={windowHeight}>
        <Board
          headPosition={[headRow, headCol]}
          applePosition={apple}
          tail={tail}
        />
      </CentralContainer>
      <TopContainer>
        <MiddleContainer style={{ flexDirection: "row" }}>
          <CurrentScoreContainer>
            <Text style={{ position: "absolute", paddingBottom: 50 }}>
              Score
            </Text>
            <ScoreText>{score}</ScoreText>
          </CurrentScoreContainer>
          <HighScoreContainer>
            <Text style={{ position: "absolute", paddingBottom: 55 }}>👑</Text>
            <ScoreText>{highScore}</ScoreText>
          </HighScoreContainer>
        </MiddleContainer>
        <MiddleContainer>
          <IconPlay
            name={pause ? "play-arrow" : "pause"}
            onPress={() => setPause(!pause)}
            size={50}
          />
        </MiddleContainer>
      </TopContainer>
      <BottomContainer>
        <PoweredLabel onPress={redirectToWebsite}>Powered by</PoweredLabel>
        <LogoContainer>
          <TouchableOpacity onPress={redirectToWebsite}>
            <LogoImg source={require("img/logoFF.png")} />
          </TouchableOpacity>
        </LogoContainer>
      </BottomContainer>
      <RightTopContainer>
        <Icon name="settings" size={30} onPress={onPressSetting} />
      </RightTopContainer>
    </GestureRecognizer>
  );
};

export { SnakeScreen };
