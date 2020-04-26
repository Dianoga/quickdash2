import React from 'react';
import classnames from 'classnames';

export type SelectValue = string | string[] | undefined;

type Props = React.PropsWithChildren<{
	allowEmpty?: boolean;
	control?: boolean;
	extraClasses?: any;
	multiple?: boolean;
	onSelected?: (value: SelectValue) => any;
	placeholder?: string;
	value?: SelectValue;
}>;

const Select: React.FC<Props> = ({
	allowEmpty = false,
	children,
	control = false,
	extraClasses,
	onSelected,
	placeholder,
	multiple = false,
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
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{allowEmpty && <option value="" />}
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
