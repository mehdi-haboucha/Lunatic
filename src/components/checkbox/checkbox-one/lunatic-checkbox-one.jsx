import React from 'react';
import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../../commons/use-on-handle-change';
import CheckboxOne from './html/checkbox-one';

function LunaticCheckboxOne({
	id,
	options,
	value,
	errors,
	handleChange,
	response,
	label,
	description,
	preferences,
	declarations,
	missingResponse,
	missing,
	management,
	shortcut,
}) {
	const onSelect = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticComponent
			id={id}
			label={label}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			missing={missing}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<CheckboxOne
				id={id}
				className="lunatic-checkbox-one"
				options={options}
				value={value}
				errors={errors}
				onSelect={onSelect}
				response={response}
				label={label}
				shortcut={shortcut}
			/>
		</LunaticComponent>
	);
}

export default LunaticCheckboxOne;
