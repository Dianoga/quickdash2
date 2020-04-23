import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../store';

type Props = {};

const Setup: React.FC<Props> = () => {
	const defaultDashboard = useSelector(
		(state: RootState) => Object.keys(state.dashboard.dashboards)?.[0]
	);

	if (!defaultDashboard) {
		return <Navigate to="/user/profile" />;
	}

	return <Navigate to={`/dashboard/${defaultDashboard}`} />;
};

export default Setup;
