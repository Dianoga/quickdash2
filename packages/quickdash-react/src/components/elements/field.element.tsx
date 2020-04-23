import React from 'react';

type Props = React.PropsWithChildren<{
	label?: string;
	horizontal?: boolean;
}>;

const Field: React.FC<Props> = ({ children, horizontal = false, label }) => {
	if (horizontal) {
		return (
			<div className="field is-horizontal">
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
		<div className="field">
			<label className="label">{label}</label>
			<div className="control">{children}</div>
		</div>
	);
};

export default Field;
