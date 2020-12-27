import React, { useEffect, useMemo, useState } from "react";
import { Text, AsyncStorage } from "react-native";
import { ChoiceWrapper, DropdownColor, Wrapper, IconArrow } from "./styles";
import _ from "lodash";
import {
  INITIAL_APPLE_COLOR,
  INITIAL_HEAD_COLOR,
  INITIAL_TAIL_COLOR,
  AVAILABLE_COLORS,
} from "config/snakeConfig";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const getColor = async (setColor, element) => {
  try {
    const color = await AsyncStorage.getItem(element);
    const colorParsed = JSON.parse(color);
    if (colorParsed) {
      setColor(colorParsed);
    }
  } catch (error) {
    console.log(error);
  }
};

const storeColor = async (color, element) => {
  try {
    await AsyncStorage.setItem(element, JSON.stringify(color));
  } catch (error) {
    console.log(error);
  }
};

export const SnakeConfigScreen = () => {
  const [colorHead, setColorHead] = useState(INITIAL_HEAD_COLOR);
  const [colorTail, setColorTail] = useState(INITIAL_TAIL_COLOR);
  const [colorApple, setColorApple] = useState(INITIAL_APPLE_COLOR);

  const navigation = useNavigation();

  useEffect(() => {
    getColor(setColorHead, "headColor");
    getColor(setColorTail, "tailColor");
    getColor(setColorApple, "appleColor");
  }, []);

  const colorsOption = useMemo(
    () =>
      AVAILABLE_COLORS.map((color) => ({
        label: _.capitalize(color),
        value: _.lowerCase(color),
        color: _.lowerCase(color),
      })),
    []
  );

  const onChangeColor = (colorValue, nameElement) => {
    if (nameElement === "head") {
      setColorHead(colorValue);
      storeColor(colorValue, "headColor");
    } else if (nameElement === "tail") {
      setColorTail(colorValue);
      storeColor(colorValue, "tailColor");
    } else if (nameElement === "apple") {
      setColorApple(colorValue);
      storeColor(colorValue, "appleColor");
    }
  };

  return (
    <Wrapper>
      <View style={{ position: "absolute", top: 10, left: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 10 }}
        >
          <IconArrow name="chevron-left" color="#007df7" size={35} />
        </TouchableOpacity>
      </View>
      <Text style={{ marginBottom: 30, alignSelf: "center" }}>
        Customize your snake! Choose the color:
      </Text>
      <ChoiceWrapper>
        <Text style={{ width: "30%", textAlign: "right" }}>Head color</Text>
        <DropdownColor
          style={{ width: "50%", borderColor: colorHead }}
          items={colorsOption}
          value={colorHead}
          onChange={(color) => onChangeColor(color, "head")}
        />
      </ChoiceWrapper>
      <ChoiceWrapper>
        <Text style={{ width: "30%", textAlign: "right" }}>Tail color</Text>
        <DropdownColor
          style={{ width: "50%", borderColor: colorTail }}
          items={colorsOption}
          value={colorTail}
          onChange={(color) => onChangeColor(color, "tail")}
        />
      </ChoiceWrapper>
      <ChoiceWrapper>
        <Text style={{ width: "30%", textAlign: "right" }}>Apple color</Text>
        <DropdownColor
          style={{ width: "50%", borderColor: colorApple }}
          items={colorsOption}
          value={colorApple}
          onChange={(color) => onChangeColor(color, "apple")}
        />
      </ChoiceWrapper>
    </Wrapper>
  );
};
