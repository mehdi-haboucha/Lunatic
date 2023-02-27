import { LunaticError, LunaticState, LunaticControl } from '../../type';

function resolveControl(
	state: LunaticState,
	control: LunaticControl
): LunaticError | undefined {
	const { executeExpression } = state;
	const { iteration, shallowIteration } = state.pager ?? {};
	const { criticality, errorMessage, id, typeOfControl } = control;
	const { control: { value = 'true' } = {} } = control;
	try {
		const it = shallowIteration ? [shallowIteration] : iteration;
		const result = executeExpression(value, { iteration: it });
		if (!result) {
			const { value: labelValue } = errorMessage;
			const label = executeExpression<string>(labelValue, { iteration: it });
			return {
				criticality,
				errorMessage: label,
				id,
				typeOfControl,
				formula: value,
				labelFormula: labelValue,
			};
		}
		return undefined;
	} catch (e) {
		console.log(`Error on validating control ${value}`);
		return undefined;
	}
}

/**
 * Convert controls into errors
 */
export function resolveComponentControls(
	state: LunaticState,
	controls: LunaticControl[]
): LunaticError[] {
	return controls.reduce(function (errors, control) {
		const error = resolveControl(state, control);
		if (error) {
			return [...errors, error];
		}
		return errors;
	}, [] as LunaticError[]);
}
