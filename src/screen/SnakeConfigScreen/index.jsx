import React from "react";
import { Text } from "react-native";
import { Dropdown } from "components/Dropdown";
import { Wrapper } from "./styles";

export const SnakeConfigScreen = () => {
  return (
    <Wrapper>
      <Text>Customize your snake! Choose the color:</Text>
      <Dropdown />
    </Wrapper>
  );
};
