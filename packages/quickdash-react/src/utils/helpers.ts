import { DeviceData, Capability } from '../store/device.slice';
import { shallowEqual } from 'react-redux';

export const extractDeviceComponentId = (id: DeviceComponentId) => {
	const [deviceId, componentId] = id.split(':');

	return { deviceId, componentId };
};

export const createWidgetId = (widgets: WidgetData[]) => {
	const length = 4;

	const ids = widgets.map((widget) => widget.id);

	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let result = '';
	let charactersLength = characters.length;
	do {
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
	} while (ids.includes(result));

	return result;
};

export const extractCapabilities = (device: DeviceData) => {
	const capabilities: Capability[] = [];
	device.components.forEach((component) =>
		component.capabilities.forEach((capability) =>
			capabilities.push(capability)
		)
	);

	return capabilities;
};

export class ObjectSet<T> extends Set {
	constructor(items: T[] = []) {
		super(items);
	}

	add(item: T) {
		if (!this.has(item)) super.add(item);
		return this;
	}

	has(item: T) {
		let found = false;
		this.forEach((i) => {
			if (shallowEqual(i, item)) found = true;
		});

		return found;
	}
}
