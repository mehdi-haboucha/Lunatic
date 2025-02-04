import React from 'react';
import { OrchestratedComponent } from '../commons';
import { Td } from '../commons/components/html-table';

function collecteResponseValue(response, value) {
	if (typeof response === 'object') {
		const { name } = response;
		if (name in value) {
			return value[name];
		}
	}

	return undefined;
}

function collecteArrayResponseValue(responses, value) {
	const [response, ...rest] = responses;

	if (response) {
		return [
			collecteResponseValue(response, value),
			collecteArrayResponseValue(rest, value),
		];
	}
	return [];
}

function collecteValue(component, value) {
	const { response, responses } = component;

	if (Array.isArray(responses)) {
		return collecteArrayResponseValue(responses, value);
	}
	if (typeof response === 'object') {
		return collecteResponseValue(response, value);
	}
	return {};
}

function Cell({
	content,
	id,
	executeExpression,
	paths,
	iteration,
	value,
	row,
	index,
	handleChange,
	errors,
}) {
	const { label, componentType, rowspan, colspan } = content;

	if (componentType) {
		const valueField = collecteValue(content, value);
		return (
			<Td id={id} row={row} index={index} rowSpan={rowspan} colSpan={colspan}>
				<OrchestratedComponent
					id={id}
					component={content}
					handleChange={handleChange}
					value={valueField}
					executeExpression={executeExpression}
					paths={paths}
					iteration={iteration}
					errors={errors}
				/>
			</Td>
		);
	}

	const getLabel = () => {
		try {
			return executeExpression(label, { iteration });
		} catch (e) {
			return e.toString();
		}
	};

	return (
		<Td id={id} row={row} index={index} rowSpan={rowspan} colSpan={colspan}>
			{getLabel()}
		</Td>
	);
}

export default Cell;
