import React from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";

import { appActions } from "../../core/app";

import "./notifications.scss";

class Notifications extends React.Component {
	_expandNotif = (e) => {
		e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
	};

	_collapseNotif = (e) => {
		e.currentTarget.style.height = "";
	};

	render() {
		return (
			<TransitionGroup className="notifications">
				{Object.keys(this.props.notifications).map((i) => (
					<CSSTransition timeout={300} classNames="" key={i}>
						<div
							className={classNames({
								notification: true,
								error: this.props.notifications[i].error
							})}
							onMouseOver={this._expandNotif}
							onMouseOut={this._collapseNotif}>
							<div className="close" onClick={() => this.props.dismissNotif(i)}>
								x
							</div>
							<span>
								{this.props.notifications[i].message +
									(this.props.notifications[i].error
										? "; " + (this.props.notifications[i].error.message || "Unknown error") + "."
										: ".")}
							</span>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		notifications: state.app.notifications
	};
};

const mapDispatchToProps = {
	dismissNotif: appActions.dismissNotif
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notifications);
