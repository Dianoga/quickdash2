import React from 'react';
import classnames from 'classnames';

type Props = {
	label?: string;
	type?: string;
	horizontal?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({
	horizontal = false,
	label,
	type = 'text',
	...inputProps
}) => {
	if (horizontal) {
		return (
			<div className="field is-horizontal">
				<div className="field-label">
					<label className="label">{label}</label>
				</div>
				<div className="field-body">
					<div className="control">
						<input className="input" type={type} {...inputProps} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="field">
			<label className="label">{label}</label>
			<div className="control">
				<input className="input" type={type} {...inputProps} />
			</div>
		</div>
	);
};

export default Input;
