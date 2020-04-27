import React from 'react';

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ ...inputProps }) => {
	return <input className="input" {...inputProps} />;
};

export default Input;
