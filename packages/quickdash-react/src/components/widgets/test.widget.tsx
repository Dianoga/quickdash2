import React from 'react';
import { useData } from 'muuri-react';

import Widget from './widget';

type Props = {
	type: string;
};

const TestWidget: React.FC<Props> = ({ type }) => {
	useData({ type });

	return (
		<Widget>
			<p>Test widget</p>
		</Widget>
	);
};

export default TestWidget;
