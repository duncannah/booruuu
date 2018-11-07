import React from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import styles from "./tags.module.scss";

class PopularTags extends React.Component {
	render() {
		return (
			<TransitionGroup className={styles.tags}>
				{this.props.popularTags.map((tag) => (
					<CSSTransition timeout={300} classNames="_fade" key={tag.name}>
						<div
							className={styles.tag}
							style={{
								color: Object.values(this.props.sites[this.props.currentSite].tagTypes).find(
									(o) => o.id === tag.type
								).color
							}}>
							<div className={styles.actions}>
								<div className={styles.info}>?</div>
								<div className={styles.add}>+</div>
								<div className={styles.substract}>-</div>
							</div>
							{tag.name}
							<div className={styles.count}>{tag.count}</div>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>
		);
	}
}

class PostTags extends React.Component {
	render() {
		return (
			<div className={styles.tags}>
				{this.props.currentSite
					? Object.keys(this.props.sites[this.props.currentSite].tagTypes).map((name) => {
							const type = this.props.sites[this.props.currentSite].tagTypes[name];

							const tags = this.props.post.post.tags.map((tag) => {
								if (tag[2] !== type.id) return [];
								else
									return (
										<CSSTransition timeout={300} classNames="_fade" key={tag[0]}>
											<div className={styles.tag}>
												<div className={styles.actions}>
													<div className={styles.info}>?</div>
												</div>
												{tag[0]}
												<div className={styles.count}>{tag[1] > 0 ? tag[1] : "..."}</div>
											</div>
										</CSSTransition>
									);
							});

							return tags.flat().length > 0 ? (
								<div className={styles.type} style={{ color: type.color }} key={name}>
									<div className={styles.name}>{name}</div>
									<TransitionGroup>{tags}</TransitionGroup>
								</div>
							) : (
								""
							);
					  })
					: ""}
			</div>
		);
	}
}

class Tags extends React.Component {
	render() {
		return this.props.postView ? <PostTags {...this.props} /> : <PopularTags {...this.props} />;
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		popularTags: state.site.popularTags,
		sites: state.site.sites,
		currentSite: state.site.currentSite,
		post: state.post.postView
	};
};

const mapDispatchToProps = {
	//dismissNotif: appActions.dismissNotif
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tags);
