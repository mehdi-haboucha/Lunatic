import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Errors } from '../commons';
import { Table, Tbody } from '../commons/components/html-table';
import LunaticComponent from '../commons/components/lunatic-component-with-label';
import Header from './header';
import TableOrchestrator from './table-orchestrator';

function LunaticTable(props) {
	const {
		id,
		handleChange,
		value,
		body,
		header,
		executeExpression,
		iteration,
		errors,
		preferences,
		missing,
		declarations,
		missingResponse,
		management,
		description,
		label,
	} = props;
	const [nbRows, setNbRows] = useState(undefined);

	useEffect(
		function () {
			if (Array.isArray(body)) {
				const { length } = body;
				setNbRows(length);
			}
		},
		[body]
	);

	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			label={label}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<Table id={id} header={header}>
				<Header id={id} header={header} />
				<Tbody>
					<TableOrchestrator
						id={id}
						body={body}
						executeExpression={executeExpression}
						handleChange={handleChange}
						iteration={iteration}
						nbRows={nbRows}
						valueMap={value}
					/>
				</Tbody>
			</Table>
			<Errors errors={errors} activeId={id} />
		</LunaticComponent>
	);
}

LunaticTable.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.object,
	body: PropTypes.arrayOf(PropTypes.array).isRequired,
	header: PropTypes.array,
};

LunaticTable.defaultProps = {
	lines: undefined,
	value: {},
	header: [],
};

export default LunaticTable;
