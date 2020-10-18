import styled from "styled-components";
import { Dropdown } from "components/Dropdown";

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 40px;
`;

export const DropdownColor = styled(Dropdown)`
  width: 100px;
  margin: 10px 20px;
`;

export const ChoiceWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
