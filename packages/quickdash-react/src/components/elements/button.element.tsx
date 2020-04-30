import React from 'react';
import classnames from 'classnames';
import type { ClassValue } from 'classnames/types';

type Props = React.PropsWithChildren<{
	className?: ClassValue;
	control?: boolean;
}> &
	React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
	children,
	control = false,
	className,
	...buttonProps
}) => {
	const buttonClass = classnames('button', className);

	const button = (
		<button className={buttonClass} {...buttonProps}>
			{children}
		</button>
	);

	if (control) {
		return <div className="control">{button}</div>;
	}

	return button;
};

export default Button;
