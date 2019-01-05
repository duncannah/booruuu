import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import "./post-info.scss";

class PostInfo extends React.Component {
	_fuzzyTime(time) {
		const units = [
			[1000 * 60 * 60 * 24 * 365.25, "year"],
			[1000 * 60 * 60 * 24 * 30.4375, "month"],
			[1000 * 60 * 60 * 24 * 7, "week"],
			[1000 * 60 * 60 * 24, "day"],
			[1000 * 60 * 60, "hour"],
			[1000 * 60, "minute"]
		];

		const Δ = new Date() - time;

		for (const unit of units) {
			if (Δ > unit[0]) {
				const count = Math.floor(Δ / unit[0]);
				return `${count === 1 ? (unit[1] === "hour" ? "an" : "a") : count} ${unit[1]}${
					count !== 1 ? "s" : ""
				} ago`;
			}
		}

		return `a few seconds ago`;
	}

	_fuzzySize(size) {
		const units = [[1000000, "M"], [1000, "k"]];

		for (const unit of units) {
			if (size > unit[0]) {
				const count = Math.floor((size / unit[0]) * 100) / 100;
				return count + unit[1] + "B";
			}
		}

		return size + "B";
	}

	render() {
		const post = this.props.posts[this.props.post.post];

		if (!post) return null;

		return (
			<div className="postInfo">
				<div className="title">info</div>
				<ul>
					{post.sources.length
						? post.sources.map((s) => (
								<li className="source" key={s}>
									Source:{" "}
									<strong>
										{
											s.match(/^http(s|):\/\//i) ? 
										<a href={s} target="_blank" rel="noopener noreferrer">
											{s}
										</a> : s
										}
									</strong>
								</li>
						  ))
						: ""}
					<li>
						Posted{" "}
						<strong className="time" title={new Date(post.time).toString()}>
							{this._fuzzyTime(post.time)}
						</strong>{" "}
						by <strong>{post.author}</strong>
					</li>
					<li>
						Rating:{" "}
						<strong
							className={classNames({
								green: post.rating === 0,
								yellow: post.rating === 1,
								red: post.rating === 2
							})}>
							{["Safe", "Questionable", "Explicit"][post.rating]}
						</strong>
					</li>
					<li>
						Score:{" "}
						<strong
							className={classNames({
								green: post.score > 0,
								red: post.score < 0
							})}>
							{post.score}
						</strong>
					</li>
					<li>
						ID: <strong>{post.id}</strong>
					</li>
					<li>
						Size:{" "}
						<strong>
							<a href={post.full[0]} target="_blank" rel="noopener noreferrer">
								{post.full[1]}x{post.full[2]}{post.fileSize !== 0 ? ' (' + this._fuzzySize(post.fileSize) + ')' : ''}
							</a>
						</strong>
					</li>
				</ul>
			</div>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		sites: state.site.sites,
		currentSite: state.site.currentSite,
		posts: state.post.posts,
		post: state.post.postView
	};
};

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostInfo);
