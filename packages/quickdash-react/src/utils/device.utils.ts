import { DeviceComponentId } from '../typings/global';

export const extractDeviceComponentId = (id: DeviceComponentId) => {
	const [deviceId, componentId] = id.split(':');

	return { deviceId, componentId };
};
