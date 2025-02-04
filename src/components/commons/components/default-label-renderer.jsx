import React from 'react';
import PropTypes from 'prop-types';

function getContent(option, search) {
	if (option) {
		const { id, value, label } = option;
		return label ? `${id || value} - ${label}` : id || value;
	}
	if (search && search.trim().length) {
		return search;
	}
	return null;
}

function DefaultLabelRenderer({ option, placeholder, search }) {
	const content = getContent(option, search);
	if (content) {
		return <span className="selection">{content}</span>;
	}
	return <span className="placeholder">{placeholder}</span>;
}

DefaultLabelRenderer.propTypes = {
	option: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}),
	placeholder: PropTypes.string,
	search: PropTypes.string,
};

export default DefaultLabelRenderer;
