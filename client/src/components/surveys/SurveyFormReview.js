// SurveyFormReview shows users their inputs
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
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
			<button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
				Back
			</button>
			<button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}>
				Send Survey
				<i className="material-icons right">email</i>
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

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

// form values in mapstatetoprops are from the redux store form
// redux actions are also mapped to props and thus accessible via props

// withRouter aids in redirecting our page after posting, it provides the history api inside props which we send to the action creator for use
