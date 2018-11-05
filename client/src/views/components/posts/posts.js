import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { postActions } from "../../../core/post";
import Icon from "../icon";

import styles from "./posts.module.scss";

class Post extends React.Component {
	render() {
		const { id, thumb, score, fav, rating } = this.props;

		return (
			<div className={styles.post}>
				<div className={styles.inner} onClick={() => this.props.onClick(id)}>
					<img src={thumb[0]} alt="" width={thumb[1]} height={thumb[2]} />
					<div className={styles.info}>
						<span
							className={classNames({
								[styles.score]: true,
								[styles.green]: score > 0,
								[styles.red]: score < 0
							})}>
							{Math.abs(score)}
						</span>
						<span className={styles.favs}>
							<Icon name="favorite" className={styles.icon} />
							{fav}
						</span>
						<span
							className={classNames({
								[styles.rating]: true,
								[styles.green]: rating === 0,
								[styles.yellow]: rating === 1,
								[styles.red]: rating === 2
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
	_onClick = (id) => {
		this.props.startViewingPost(id);
	};

	render() {
		return (
			<div className={styles.posts}>
				{this.props.posts.map((post, i) => (
					<Post {...post} key={this.props.currentSite + post.id} index={i} onClick={this._onClick} />
				))}
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
