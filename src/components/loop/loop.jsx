import React from 'react';
import BlockForLoop from './block-for-loop';
import RosterForLoop from './roster-for-loop';

const LoopTypes = {
	rosterForLoop: 'RosterForLoop',
	blockForLoop: 'Loop',
};

function Loop(props) {
	const {
		declarations,
		label,
		lines,
		iterations,
		id,
		components,
		handleChange,
		value,
		executeExpression,
		loopDependencies,
		componentType,
		headers,
		shortcut,
		management,
		missing,
		features,
		preferences,
		paginatedLoop,
		errors,
	} = props;
	switch (componentType) {
		case LoopTypes.blockForLoop:
			return (
				<BlockForLoop
					declarations={declarations}
					label={label}
					lines={lines}
					iterations={iterations}
					id={id}
					components={components}
					handleChange={handleChange}
					valueMap={value}
					management={management}
					executeExpression={executeExpression}
					loopDependencies={loopDependencies}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					paginatedLoop={paginatedLoop}
					errors={errors}
				/>
			);
		case LoopTypes.rosterForLoop:
			return (
				<RosterForLoop
					declarations={declarations}
					label={label}
					lines={lines}
					iterations={iterations}
					id={id}
					components={components}
					handleChange={handleChange}
					valueMap={value}
					management={management}
					executeExpression={executeExpression}
					loopDependencies={loopDependencies}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					headers={headers}
					errors={errors}
				/>
			);
		default:
			return null;
	}
}

export default Loop;
