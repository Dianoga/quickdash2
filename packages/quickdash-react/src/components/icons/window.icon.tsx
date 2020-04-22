import React from 'react';
import classnames from 'classnames';
import { ClassValue } from 'classnames/types';

import('./window.icon.scss');

type Props = {
	className: ClassValue;
};

const WindowIcon: React.FC<Props> = ({ className }) => {
	const classes = classnames(['icon', 'window'], className);

	return (
		<svg
			viewBox="0 0 150 200"
			className={classes}
			stroke="white"
			fill="none"
			fillOpacity="0.1"
		>
			<defs>
				<g id="pane">
					<rect width="150" y="5" height="90" strokeWidth="10" />
					<line x1="0" x2="150" y1="50" y2="50" strokeWidth="3" />
					<line x1="75" x2="75" y1="5" y2="90" strokeWidth="3" />
				</g>
			</defs>

			<rect
				width="150"
				y="100"
				height="100"
				strokeWidth="10"
				fillOpacity="1"
				className="window-bg"
			/>
			<use xlinkHref="#pane" />
			<use xlinkHref="#pane" y="100" className="window-bottom" />
		</svg>
	);
};

export default WindowIcon;
