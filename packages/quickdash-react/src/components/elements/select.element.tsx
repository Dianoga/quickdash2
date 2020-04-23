import React from 'react';
import classnames from 'classnames';

export type SelectValue = string | string[];

type Props = React.PropsWithChildren<{
	extraClasses?: any;
	control?: boolean;
	onSelected?: (value?: SelectValue) => any;
	placeholder?: string;
}> &
	React.SelectHTMLAttributes<HTMLSelectElement>;

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
