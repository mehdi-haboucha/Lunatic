import React from 'react';
import LunaticIcon from './lunatic-icon';

function CheckboxUncheckedIcon({ className, width = 32, height = 32 }) {
	return (
		<LunaticIcon className={className}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				x="0"
				y="0"
				enableBackground="new 0 0 32 32"
				version="1.1"
				viewBox="0 0 32 32"
				xmlSpace="preserve"
			>
				<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
				<path d="M0 0h24v24H0z" fill="none" />
			</svg>
		</LunaticIcon>
	);
}

export default CheckboxUncheckedIcon;
