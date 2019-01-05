import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return 'Still thinking';
			case false:
				return 'Get Out';

			default:
				return 'Welcome';
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<a className="left brand-logo">Emaily</a>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return {
		auth: auth
	};
};

export default connect(mapStateToProps)(Header);
