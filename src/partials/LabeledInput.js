import React from "react";
import { InputWrap, InnerWrap, InputLabel, Input } from "../partials/StyledElements";

const LabeledInput = ({ name, placeholder, label, innerRef, ...props }) => {
  return (
    <InputWrap {...props}>
      <InputLabel for={name}> {label}:</InputLabel>
      <InnerWrap>
        <Input
          innerRef={innerRef}
          name={name}
          placeholder={placeholder.replace(",", " ")}
        />
        {props.children ? props.children : null}
      </InnerWrap>
    </InputWrap>
  );
};

export default LabeledInput;