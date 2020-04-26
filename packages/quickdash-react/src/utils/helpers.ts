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
