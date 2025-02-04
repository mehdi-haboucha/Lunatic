import React, { useCallback } from 'react';
import { Tr, Td } from '../../commons/components/html-table';

import { OrchestratedComponent } from '../../commons';

function Row({
	id,
	components,
	valueMap,
	rowIndex,
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	executeExpression,
	errors,
}) {
	const handleChangeRow = useCallback(
		function (response, value) {
			handleChange(response, value, { index: rowIndex });
		},
		[handleChange, rowIndex]
	);

	if (Array.isArray(components)) {
		return (
			<Tr id={id} row={rowIndex}>
				{components.map(function (component) {
					const { response, id } = component;
					const idComponent = `${id}-${rowIndex} `;
					let value = undefined;
					const key = `${id}-${rowIndex}`;
					if (response) {
						const { name } = response;
						if (name in valueMap) {
							value = valueMap[name][rowIndex] || '';
						}
					}

					return (
						<Td id={idComponent} key={key}>
							<OrchestratedComponent
								component={component}
								handleChange={handleChangeRow}
								features={features}
								missing={missing}
								shortcut={shortcut}
								management={management}
								value={value}
								id={idComponent}
								preferences={preferences}
								iteration={rowIndex}
								executeExpression={executeExpression}
								errors={errors}
							/>
						</Td>
					);
				})}
			</Tr>
		);
	}
	return <Tr id={id}></Tr>;
}

export default Row;
