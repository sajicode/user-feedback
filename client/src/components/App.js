import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Thanks from './Thanks';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route path="/" exact component={Landing} />
						<Route path="/surveys" exact component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
						<Route path="/api/surveys/thanks" component={Thanks} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);

// This way the actions are passed into the App component as props
