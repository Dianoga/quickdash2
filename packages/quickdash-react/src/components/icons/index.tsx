import React from 'react';

import WindowIcon from './window/window.icon';
import MotionIcon from './motion/motion.icon';
import LightIcon from './light/light.icon';

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
	} else if (type === IconType.LIGHT) {
		return <LightIcon {...props} />;
	}

	return null;
};

export default Icon;
