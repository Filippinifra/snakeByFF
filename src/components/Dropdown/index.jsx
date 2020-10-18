import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { DropdownWrapper } from "./styles";

export const Dropdown = ({ style, items, onChange, value }) => (
  <DropdownWrapper style={style}>
    <RNPickerSelect onValueChange={onChange} value={value} items={items} />
  </DropdownWrapper>
);
