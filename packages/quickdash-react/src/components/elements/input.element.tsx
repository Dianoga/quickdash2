import React from 'react';
import classnames from 'classnames';

type Props = {
	label?: string;
	type?: string;
	horizontal?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ type = 'text', ...inputProps }) => {
	return <input className="input" type={type} {...inputProps} />;
};

export default Input;
