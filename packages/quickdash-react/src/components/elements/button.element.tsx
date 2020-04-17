import React from 'react';
import classnames from 'classnames';

type Props = React.PropsWithChildren<{
	extraClasses?: any;
	control?: boolean;
}> &
	React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
	children,
	control = false,
	extraClasses,
	...buttonProps
}) => {
	const buttonClass = classnames('button', extraClasses);

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
