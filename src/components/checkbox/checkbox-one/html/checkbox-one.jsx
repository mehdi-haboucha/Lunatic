import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '../../../radio/html/radio-group';
import { createCustomizableLunaticField } from '../../../commons';
import './checkbox-one.scss';

function CheckboxOne({
	options,
	value,
	id,
	label,
	description,
	onSelect,
	errors,
	shortcut,
}) {
	return (
		<RadioGroup
			id={id}
			className="lunatic-checkbox-one"
			options={options}
			value={value}
			errors={errors}
			label={label}
			description={description}
			onSelect={onSelect}
			checkboxStyle={true}
			shortcut={shortcut}
		/>
	);
}

CheckboxOne.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
			]),
		})
	),
	id: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.object,
	shortcut: PropTypes.bool,
};

CheckboxOne.defaultProps = {
	options: [],
	errors: undefined,
	label: undefined,
};

export default createCustomizableLunaticField(CheckboxOne, 'CheckboxOne');
