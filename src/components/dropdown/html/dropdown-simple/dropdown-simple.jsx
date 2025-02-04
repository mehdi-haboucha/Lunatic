import React from 'react';
import { ComboBox } from '../../../commons';
import SimpleOptionRenderer from './simple-option-renderer';
import SimpleLabelRenderer from './simple-label-renderer';

function DropdownSimple({
	id,
	disabled,
	options,
	onSelect,
	className,
	value,
	label,
	errors,
	description,
}) {
	return (
		<ComboBox
			id={id}
			className={className}
			disabled={disabled}
			options={options}
			editable={false}
			onSelect={onSelect}
			optionRenderer={SimpleOptionRenderer}
			labelRenderer={SimpleLabelRenderer}
			value={value}
			label={label}
			errors={errors}
			description={description}
		/>
	);
}

export default DropdownSimple;
