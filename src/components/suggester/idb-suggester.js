import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SuggesterWrapper from './suggester-wrapper';
import createSearching from './searching';
import CheckStore from './check-store';

// function createSearching(storeName, version) {
// 	return async function (search) {
// 		return searching(search, storeName, version);
// 	};
// }

function IDBSuggester({
	storeName,
	idbVersion,
	id,
	className,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	disabled,
	value,
}) {
	const [store, setStore] = useState(undefined);
	const search = useMemo(
		function () {
			if (store) {
				return createSearching(storeName, idbVersion);
			}
			return undefined;
		},
		[storeName, idbVersion, store]
	);

	return (
		<CheckStore
			storeName={storeName}
			idbVersion={idbVersion}
			setStore={setStore}
		>
			<SuggesterWrapper
				id={id}
				className={className}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				onSelect={onSelect}
				searching={search}
				storeName={storeName}
				disabled={disabled}
				value={value}
			/>
		</CheckStore>
	);
}

IDBSuggester.defaultProps = {
	idbVersion: '1',
};

IDBSuggester.propTypes = {
	storeName: PropTypes.string.isRequired,
	idbVersion: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
};

export default IDBSuggester;
