// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { DeviceStatusData } from '../services/device-statuses/device-statuses.class';

export const buildStatusId = ({
	deviceId,
	componentId,
	capabilityId,
	attributeName,
}: Partial<DeviceStatusData>) => {
	return `${deviceId}:${componentId}:${capabilityId}:${attributeName}`;
};

export default (options = {}): Hook => {
	return async (context: HookContext) => {
		if (context.id === 'auto') {
			context.id = buildStatusId(context.data);
		}

		return context;
	};
};
