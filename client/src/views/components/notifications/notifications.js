import React from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";

import { appActions } from "../../../core/app";

import styles from "./notifications.module.scss";

class Notifications extends React.Component {
	closeNotification = (i) => {
		this.props.dismissNotif(i);
	};

	render() {
		return (
			<TransitionGroup className={styles.notifications}>
				{Object.keys(this.props.notifications).map((i) => (
					<CSSTransition timeout={300} classNames={styles} key={i}>
						<div
							className={classNames({
								[styles.notification]: true,
								[styles.error]: this.props.notifications[i].error
							})}>
							<div className={styles.close} onClick={() => this.closeNotification(i)}>
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
