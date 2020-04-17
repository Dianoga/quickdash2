import React from 'react';

export type DoorControlProps = {
	deviceId: string;
};

const DoorControl: React.FC<DoorControlProps> = ({ deviceId }) => {
	return <p>{deviceId}</p>;
};

export default DoorControl;
