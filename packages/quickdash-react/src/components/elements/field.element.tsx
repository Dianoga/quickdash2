import React from 'react';
import classnames from 'classnames';

import type { ClassValue } from 'classnames/types';

type Props = React.PropsWithChildren<{
	className?: ClassValue;
	label?: string;
	horizontal?: boolean;
}>;

const Field: React.FC<Props> = ({
	children,
	className,
	horizontal = false,
	label,
}) => {
	const fieldClasses = classnames(
		'field',
		{ 'is-horizontal': horizontal },
		className
	);

	if (horizontal) {
		return (
			<div className={fieldClasses}>
				<div className="field-label">
					<label className="label">{label}</label>
				</div>
				<div className="field-body">
					<div className="control">{children}}</div>
				</div>
			</div>
		);
	}

	return (
		<div className={fieldClasses}>
			<label className="label">{label}</label>
			<div className="control">{children}</div>
		</div>
	);
};

export default Field;
