import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
	background-color: transparent;
	color: #fff;
	padding: 8px 36px;
	border: 1px solid #a59466;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
	transition: all 0.3s;
	text-transfrom: uppercase;

	&:hover {
		background-color: #a59466;
	}
`;

const Button = ({ text, callBack, ...props }) => (
	<StyledButton onClick={callBack} {...props}>
		{text}
	</StyledButton>
);

export default Button;