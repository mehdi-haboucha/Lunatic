import React, { useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';

function getMin(rect) {
	const { top } = rect;
	return top;
}

function getMax(rect) {
	const { top, height } = rect;
	return top + height;
}

function isVisible(optionRect, parentRect) {
	const min = Math.min(getMin(optionRect), getMin(parentRect));
	const max = Math.max(getMax(optionRect), getMax(parentRect));
	return max - min < optionRect.height + parentRect.height;  
}

function OptionContainer({ children, index, selected, onSelect }) {
	const ref = useRef();

	const onClick = useCallback(
		function (e) {
			e.stopPropagation();
			e.preventDefault();
			onSelect(index);
		},
		[onSelect, index]
	);

	useEffect(
		function () {
			const { current } = ref;
			if (current && selected) {
				const oRect = current.getBoundingClientRect();
				const pRect = current.parentNode.getBoundingClientRect();

				if (!isVisible(oRect, pRect)) {
					current.scrollIntoView();
				}
			}
		},
		[ref, selected]
	);

	return (
		<li
			className={classnames('lunatic-combo-box-option-container', { selected })}
			role="option"
			aria-selected={selected}
			onClick={onClick}
			ref={ref}
		>
			{children}
		</li>
	);
}

export default OptionContainer;
