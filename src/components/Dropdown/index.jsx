import React from "react";
import RNPickerSelect from "react-native-picker-select";

export const Dropdown = () => (
  <RNPickerSelect
    onValueChange={() => {}}
    items={[
      { label: "Football", value: "football" },
      { label: "Baseball", value: "baseball" },
      { label: "Hockey", value: "hockey" },
    ]}
  />
);
