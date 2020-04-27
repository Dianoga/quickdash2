import React from 'react';
import classnames from 'classnames';

export type SelectValue = string | string[] | undefined;

type Props = React.PropsWithChildren<{
	control?: boolean;
	extraClasses?: any;
	multiple?: boolean;
	onSelected?: (value: SelectValue) => any;
	placeholder?: string;
	required?: boolean;
	showPlaceholder?: boolean;
	value?: SelectValue;
}>;

const Select: React.FC<Props> = ({
	children,
	control = false,
	extraClasses,
	multiple = false,
	onSelected,
	placeholder = '',
	required = false,
	showPlaceholder = !multiple,
	value,
}) => {
	const containerClass = classnames(
		'select',
		{ 'is-multiple': multiple },
		extraClasses
	);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let selectedValue: SelectValue;
		if (multiple) {
			const { options } = event.target;
			selectedValue = [];
			for (let i = 0; i < options.length; i++) {
				options[i].selected && selectedValue.push(options[i].value);
			}
		} else {
			selectedValue = event.target.value;
		}

		onSelected && onSelected(selectedValue);
	};

	const select = (
		<div className={containerClass}>
			<select
				className="select"
				onChange={handleChange}
				multiple={multiple}
				value={value}
				required={required}
			>
				{showPlaceholder && <option value="">{placeholder}</option>}
				{children}
			</select>
		</div>
	);

	if (control) {
		return <div className="control">{select}</div>;
	}

	return select;
};

export default Select;
