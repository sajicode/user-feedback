// SurveyField contains logic to render a single label & text input
import React from 'react';

// props come from redux form via the parent i.e. <Field />
// props contain event handlers
// extract input from props
const SurveyField = ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};

export default SurveyField;
