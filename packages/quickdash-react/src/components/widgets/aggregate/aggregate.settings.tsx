import React from 'react';
import { useSelector } from 'react-redux';

import { Field, DevicePicker, Select, Input } from '../../elements';
import { WidgetSettingsChildProps } from '../widget.settings';
import { RootState } from '../../../store';
import { DeviceFilter, DeviceComponentId } from '../../../utils/device.hooks';
import { AggregateData } from './aggregate.widget';
import { IconType } from '../../icons';

type Props = WidgetSettingsChildProps & {
	widgetSettings: AggregateData;
};

const AggregateSettings: React.FC<Props> = ({ widgetSettings, onChange }) => {
	const {
		capabilityId = '',
		attributeName = '',
		deviceComponentIds,
		iconType = '',
		warnValues = [],
	} = widgetSettings;

	const fields: React.ReactNode[] = [];

	function handleChange<K extends keyof AggregateData>(
		key: K,
		value?: AggregateData[K]
	) {
		onChange({ ...widgetSettings, [key]: value });
	}

	const capabilities = useSelector(
		(state: RootState) => state.device.capabilities
	);

	const capabilityOptions: React.ReactNode[] = [];
	capabilities.forEach(({ id }) => {
		capabilityOptions.push(
			<option key={id} value={id}>
				{id}
			</option>
		);
	});
	fields.push(
		<Field key="capability" label="Capability">
			<Select
				placeholder="Choose capablity"
				value={capabilityId}
				onSelected={(value) => handleChange('capabilityId', value as string)}
			>
				{capabilityOptions}
			</Select>
		</Field>
	);

	if (capabilityId) {
		let deviceFilter: DeviceFilter = {};
		if (capabilityId) deviceFilter.capabilityFilter = [capabilityId];

		fields.push(
			<Field key="device" label="Select devices">
				<DevicePicker
					deviceFilter={deviceFilter}
					multiple={true}
					onDevicePick={(value) =>
						handleChange('deviceComponentIds', value as DeviceComponentId[])
					}
					value={deviceComponentIds}
				/>
			</Field>
		);

		fields.push(
			<Field key="attribute" label="Attribute name">
				<Input
					value={attributeName}
					onChange={(event) =>
						handleChange('attributeName', event.target.value)
					}
				/>
			</Field>
		);

		fields.push(
			<Field key="warnValues" label="Warning values">
				<Input
					value={warnValues.toString()}
					onChange={(event) =>
						handleChange(
							'warnValues',
							event.target.value.split(',').map((v) => v.trim())
						)
					}
				/>
				<p className="help">Comma separated</p>
			</Field>
		);

		const iconOptions = Object.values(IconType).map((iconType) => (
			<option key={iconType} value={iconType}>
				{iconType}
			</option>
		));
		fields.push(
			<Field key="icon" label="Icon">
				<Select
					required={false}
					value={iconType}
					onSelected={(value) => handleChange('iconType', value as IconType)}
				>
					{iconOptions}
				</Select>
			</Field>
		);
	}

	return <>{fields}</>;
};

export default AggregateSettings;
