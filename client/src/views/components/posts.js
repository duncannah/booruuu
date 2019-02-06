import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { postActions } from "../../core/post";

import { Welcome } from "./";

import "./posts.scss";

class Post extends React.Component {
	render() {
		const { index, thumb, score, fav, rating } = this.props;

		return (
			<div className={classNames({ post: true, flash: thumb[0] === "flash" })}>
				<div className="inner" onClick={() => this.props.onClick(index)}>
					<img src={thumb[0] !== "flash" ? thumb[0] : ""} alt="" width={thumb[1]} height={thumb[2]} />
					<div className="info">
						<span
							className={classNames({
								score: true,
								green: score > 0,
								red: score < 0
							})}>
							{Math.abs(score)}
						</span>
						{fav !== -1 ? (
							<span className="favs">
								<div className="icon">favorite</div>
								{fav}
							</span>
						) : (
							""
						)}
						<span
							className={classNames({
								rating: true,
								green: rating === 0,
								yellow: rating === 1,
								red: rating === 2
							})}>
							{["S", "Q", "E"][rating]}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

class Posts extends React.Component {
	_onClick = (i) => {
		this.props.startViewingPost(i);
	};

	render() {
		return (
			<div className="posts" key={JSON.stringify(this.props.posts.map((p) => p.id))}>
				{this.props.posts.length ? (
					this.props.posts.map((post, i) => (
						<Post {...post} key={this.props.currentSite + post.id} index={i} onClick={this._onClick} />
					))
				) : (
					<Welcome />
				)}
			</div>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		currentSite: state.site.currentSite,
		posts: state.post.posts
	};
};

const mapDispatchToProps = {
	startViewingPost: postActions.startViewingPost
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Posts);
