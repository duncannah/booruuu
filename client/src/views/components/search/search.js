import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import Icon from "../icon";

import styles from "./search.module.scss";
import { postActions } from "../../../core/post/actions";

class Search extends React.Component {
	_submit = (e) => {
		if (this.props.query !== this.props.queryBuffer) this.props.search();

		e.preventDefault();

		return false;
	};

	_change = (e) => {
		this.props.setQueryBuffer(e.target.value);
	};

	render() {
		return (
			<form
				className={classNames({
					[styles.search]: true,
					[styles.postView]: this.props.postView
				})}
				onSubmit={this._submit}>
				<input
					type="text"
					className={styles.input}
					value={this.props.queryBuffer || ""}
					placeholder="search..."
					onChange={this._change}
				/>
				<Icon className={styles.icon} name="search" />
			</form>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		query: state.post.search.query,
		queryBuffer: state.post.search.queryBuffer
	};
};

const mapDispatchToProps = {
	setQueryBuffer: postActions.setQueryBuffer,
	search: postActions.search
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search);
