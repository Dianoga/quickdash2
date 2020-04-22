import React from 'react';
import classnames from 'classnames';
import { ClassValue } from 'classnames/types';

import './motion.icon.scss';

type Props = {
	className: ClassValue;
};

const MotionIcon: React.FC<Props> = ({ className }) => {
	const classes = classnames(['icon', 'motion'], className);

	return (
		<svg viewBox="0 0 200 130" className={classes} stroke="white" fill="none">
			<rect
				className="frame"
				x="0"
				y="0"
				width="200"
				height="130"
				strokeWidth="5"
				rx="15"
			/>
			<circle className="hole" cx="100" cy="65" r="30" strokeWidth="5" />
		</svg>
	);
};

export default MotionIcon;
