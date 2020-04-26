import React from 'react';
import classnames from 'classnames';

export type SelectValue = string | string[] | undefined;

type Props = React.PropsWithChildren<{
	extraClasses?: any;
	control?: boolean;
	placeholder?: string;
	multiple?: boolean;
	onSelected?: (value: SelectValue) => any;
	value?: SelectValue;
}>;

const Select: React.FC<Props> = ({
	children,
	control = false,
	extraClasses,
	onSelected,
	placeholder,
	...selectProps
}) => {
	const selectClass = classnames('select', extraClasses);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let value: SelectValue;
		if (selectProps.multiple) {
			const { options } = event.target;
			value = [];
			for (let i = 0; i < options.length; i++) {
				options[i].selected && value.push(options[i].value);
			}
		} else {
			value = event.target.value;
		}

		onSelected && onSelected(value);
	};

	const select = (
		<div className="select">
			<select className={selectClass} onChange={handleChange} {...selectProps}>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
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
