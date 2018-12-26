import React from "react";
import { connect } from "react-redux";

import Icon from "../icon";

import "./search.scss";
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
			<form className="search" onSubmit={this._submit}>
				<input
					type="text"
					className="input"
					value={this.props.queryBuffer || ""}
					placeholder="search..."
					onChange={this._change}
				/>
				<div className="icon">search</div>
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
