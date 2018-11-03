import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
//import { CSSTransition } from "react-transition-group";

import { postActions } from "../../../core/post";

import Sidebar from "../sidebar";

import styles from "./post-view.module.scss";

class PostView extends React.Component {
	componentDidMount() {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape" && this.props.in) this.props.stopViewingPost();
		});
	}

	render() {
		return (
			<div className={classNames({ [styles.postView]: true, [styles.on]: this.props.postView.on })}>
				<Sidebar openSettingsPopup={this.props.openSettingsPopup} postView />
				<div className={styles.post}>
					<img src={this.props.postView.post.full[0]} alt="" key={"img_" + this.props.postView.post.id} />
				</div>
			</div>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		postView: state.post.postView
	};
};

const mapDispatchToProps = {
	stopViewingPost: postActions.stopViewingPost
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostView);
