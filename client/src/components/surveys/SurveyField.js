// SurveyField contains logic to render a single label & text input
import React from 'react';

// props come from redux form
// props contain event handlers
// extract input from props
const SurveyField = ({ input }) => {
	return (
		<div>
			<input {...input} />
		</div>
	);
};

export default SurveyField;
