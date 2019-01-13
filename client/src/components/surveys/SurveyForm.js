// SurevyForm shows form for user input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {
	renderFields() {
		// iterate over FIELDS, 2nd parameter is each field destructured
		return _.map(FIELDS, ({ label, name }) => {
			return <Field key={name} component={SurveyField} type="text" label={label} name={name} />;
		});
	}
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit((values) => console.log(values))}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	// if (!values.title) {
	// 	errors.title = 'You must provide a title';
	// }
	_.each(FIELDS, ({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide a ${name}`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm'
})(SurveyForm);

// the surveyfield component receives label as a prop alongside other redux-form props

// validate is for validation from redux-form
