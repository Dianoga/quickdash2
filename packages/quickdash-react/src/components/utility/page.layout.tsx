import React from 'react';
import { NavLink } from 'react-router-dom';

const PageLayout: React.FC = ({ children }) => {
	return (
		<div className="container">
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<NavLink className="navbar-item" to="/dashboard">
						Dashboard
					</NavLink>
					<NavLink className="navbar-item" to="/user/profile">
						User Profile
					</NavLink>
				</div>
			</nav>
			{children}
		</div>
	);
};

export default PageLayout;
