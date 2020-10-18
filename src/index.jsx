import React from "react";
import { SnakeScreen } from "./screen/SnakeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SnakeConfigScreen } from "screen/SnakeConfigScreen";

const Stack = createStackNavigator();

export const Code = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SnakeHome">
      <Stack.Screen
        name="SnakeHome"
        component={SnakeScreen}
        options={{
          headerStyle: { backgroundColor: "#007df7", height: "auto" },
          title: null,
        }}
      />
      <Stack.Screen
        name="SnakeConfig"
        component={SnakeConfigScreen}
        options={{
          headerStyle: { backgroundColor: "#007df7", height: "auto" },
          title: null,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
