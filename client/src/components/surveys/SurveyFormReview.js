// SurveyFormReview shows users their inputs
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	// console.log(state);
	return {
		formValues: state.form.surveyForm.values
	};
}

export default connect(mapStateToProps)(SurveyFormReview);

// form values in mapstatetoprops are from the redux store form
