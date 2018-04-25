import React from "react";
import styled from "styled-components";

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  margin: 0 auto;
  position: relative;
  width: 50%;
`;

const InputLabel = styled.label`
  color: #8c7f58;
  text-transform: capitalize;
  font-weight: bold;
`;

const Input = styled.input`
  height: 45px;
  background-color: #fafafa;
  padding-left: 1rem;
  border-style: ridge;
  font-size: 1rem;
  outline: none;
`;

const LabeledInput = ({ name, placeholder, label, innerRef, ...props }) => {
  return (
    <InputWrap {...props}>
      <InputLabel  for={name}> {label}:</InputLabel>
      <Input innerRef={innerRef} name={name} placeholder={placeholder.replace(",", " ")} />
    </InputWrap>
  );
};

export default LabeledInput;