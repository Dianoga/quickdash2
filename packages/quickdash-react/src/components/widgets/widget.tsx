import React from 'react';

type Props = React.PropsWithChildren<{}>;

const Widget: React.FC<Props> = ({ children }) => {
	return (
		<div className="widget">
			<div className="widget-content">{children}</div>
		</div>
	);
};

export default Widget;
