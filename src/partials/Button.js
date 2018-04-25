import React from "react";
import { StyledButton } from "./StyledElements";

const Button = ({ text, callBack, ...props }) => (
	<StyledButton onClick={callBack} {...props}>
		{text}
	</StyledButton>
);

export default Button;