import React from 'react';
import classnames from 'classnames';
import { ClassValue } from 'classnames/types';

import './light.icon.scss';

type Props = {
	className: ClassValue;
};

const LightIcon: React.FC<Props> = ({ className }) => {
	const classes = classnames(['icon', 'light'], className);

	return (
		<svg
			className={classes}
			viewBox="0 0 64 64"
			fill="none"
			stroke="#000"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<path
				className="bulb"
				d="M51.36 21.2a19.68 19.68 0 1 0-35.2 12.1 29.22 29.22 0 0 1 6.51 18v1.22h18v-1.8A27.52 27.52 0 0 1 47 33.5a19.57 19.57 0 0 0 4.36-12.3z"
			/>
			<g stroke-linecap="round">
				<path d="M22.23 55.58h18.9m-18.9 3.67h18.9" />
				<path d="M22.23 62.92h18.9m-9.45-14.1V32" />
				<path d="M35.08 48.83v-9h4m-10.75 9v-9h-4.16" />
			</g>
		</svg>
	);
};

export default LightIcon;
