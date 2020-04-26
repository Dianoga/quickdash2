import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { patchDashboard } from '../../store/dashboard.slice';
import { Field, Select } from '../elements';
import { DoorControlSettings } from './doorcontrol';
import { createWidgetId } from '../../utils/helpers';

type Props = {
	isNew?: boolean;
};

const widgetTypes: { type: WidgetType; label: string }[] = [
	{ type: 'DOOR_CONTROL', label: 'Door Control' },
	{ type: 'AGGREGATE', label: 'Aggregate' },
];

type WidgetOnChange = (data: WidgetData) => any;

export type WidgetSettingsChildProps = {
	onChange: WidgetOnChange;
	widgetSettings: any;
};

const WidgetSettings: React.FC<Props> = ({ isNew = false }) => {
	const { dashboardId, widgetId } = useParams();
	const { dashboard, originalWidget } = useSelector((state: RootState) => {
		const dashboard = state.dashboard.dashboards[dashboardId];

		let originalWidget: WidgetData;
		if (!isNew) {
			// @ts-ignore: This may return undefined. That's fine, we'll fix it later
			originalWidget = dashboard?.widgets?.find((w) => w.id === widgetId);

			// @ts-ignore: We know it's not defined. That's the point
		} else if (!originalWidget) {
			const id = createWidgetId(dashboard?.widgets || []);
			originalWidget = { id, type: '' };
		}

		return { dashboard, originalWidget };
	});

	const [widget, setWidget] = useState(originalWidget);

	let header = isNew ? 'Create widget' : 'Update widget';
	let widgetTypePicker;

	if (isNew) {
		// Build widget types. Ignore unknown type
		const options = widgetTypes.map(({ type, label }) => (
			<option key={type} value={type}>
				{label}
			</option>
		));

		widgetTypePicker = (
			<Field label="Widget type">
				<Select
					value={widget.type}
					onChange={(event) => {
						const type = event.target.value as WidgetType;
						// @ts-ignore: I don't know why typescript doesn't like this
						setWidget({ ...widget, type });
					}}
				>
					<option>Choose widget type</option>
					{options}
				</Select>
			</Field>
		);
	}

	const handleChange: WidgetOnChange = (data) => {
		console.log('New widget settings', data);
		setWidget(data);
	};

	let widgetSettings: React.ReactNode = widget.type && (
		<div className="control">Widget type not found</div>
	);
	if (widget.type) {
		widgetSettings = <div className="control">No settings available</div>;

		if (widget.type === 'AGGREGATE') {
		} else if (widget.type === 'DOOR_CONTROL') {
			widgetSettings = (
				<DoorControlSettings onChange={handleChange} widgetSettings={widget} />
			);
		}
	}

	const navigate = useNavigate();
	const handleClose = () => {
		navigate(-1);
	};

	const [working, setWorking] = useState(false);
	const dispatch = useDispatch();
	const handleSave = () => {
		setWorking(true);

		let widgets: WidgetData[] = [];
		if (dashboard?.widgets) widgets = [...dashboard.widgets];

		if (isNew) {
			widget.id = createWidgetId(widgets);
			widgets.push(widget);
		}

		try {
			dispatch(patchDashboard({ id: dashboardId, data: { widgets } }));
			handleClose();
		} catch {
			setWorking(false);
		}
	};

	return (
		<ReactModal isOpen={true} onRequestClose={handleClose}>
			<div className="modal-card">
				<header className="modal-card-head">{header}</header>
				<section className="modal-card-body">
					{widgetTypePicker}
					{widgetSettings}
				</section>
				<footer className="modal-card-foot">
					{widget && (
						<button
							className="button is-success"
							onClick={handleSave}
							disabled={working}
						>
							Save changes
						</button>
					)}
					<button className="button" onClick={handleClose}>
						Cancel
					</button>
				</footer>
			</div>
			<button
				className="modal-close is-large"
				aria-label="close"
				onClick={handleClose}
			></button>
		</ReactModal>
	);
};

export default WidgetSettings;
