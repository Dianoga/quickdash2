import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { WidgetType } from '../../store/dashboard.slice';
import { Field, Select } from '../elements';
import { DoorControlSettings } from './doorcontrol';

type Props = {
	isNew?: boolean;
};

export type WidgetSettingsChildProps = {
	onChange: Function;
	widgetSettings: any;
};

const WidgetSettings: React.FC<Props> = ({ isNew = false }) => {
	const { dashboardId, widgetId } = useParams();
	const originalWidget =
		useSelector((state: RootState) => {
			const dashboard = state.dashboard.dashboards[dashboardId];
			return dashboard?.widgets?.find((w) => w.id === widgetId);
		}) || {};

	const [widgetType, setWidgetType] = useState(
		(originalWidget?.type as string) || ''
	);
	const [widget, setWidget] = useState(originalWidget || {});

	let header = isNew ? 'Create widget' : 'Update widget';
	let widgetTypePicker;

	if (isNew) {
		const options = Object.values(WidgetType).map((key) => (
			<option key={key} value={key}>
				{key}
			</option>
		));

		widgetTypePicker = (
			<Field label="Widget type">
				<Select
					value={widgetType}
					onChange={(event) => setWidgetType(event.target.value)}
				>
					<option>Choose widget type</option>
					{options}
				</Select>
			</Field>
		);
	}

	const handleChange = (value: any) => {
		console.log('New widget settings', value);
		setWidget(value);
	};

	let widgetSettings: React.ReactNode = widgetType && (
		<div className="control">Widget type not found</div>
	);
	if (widgetType) {
		widgetSettings = <div className="control">No settings available</div>;

		if (widgetType === WidgetType.AGGREGATE) {
		} else if (widgetType === WidgetType.DOOR_CONTROL) {
			widgetSettings = (
				<DoorControlSettings onChange={handleChange} widgetSettings={widget} />
			);
		}
	}

	const navigate = useNavigate();
	const handleClose = () => {
		navigate(-1);
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
						<button className="button is-success">Save changes</button>
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
