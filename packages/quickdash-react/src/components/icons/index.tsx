import React from 'react';

import WindowIcon from './window.icon';
import MotionIcon from './motion.icon';

export enum IconType {
	WINDOW = 'WINDOW',
	MOTION = 'MOTION',
	LIGHT = 'LIGHT',
}

type Props = {
	type: IconType;
} & any;

const Icon: React.FC<Props> = ({ type, ...props }) => {
	if (type === IconType.WINDOW) {
		return <WindowIcon {...props} />;
	} else if (type === IconType.MOTION) {
		return <MotionIcon {...props} />;
	}

	return null;
};

export default Icon;
