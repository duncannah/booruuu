import React from "react";
import { connect } from "react-redux";

import "./tags.scss";

import { postActions } from "../../core/post/actions";
import { siteActions } from "../../core/site";

class PopularTags extends React.Component {
	render() {
		return (
			<div className="tags">
				{this.props.popularTags.map((tag) => (
					<div
						className="tag"
						style={{
							color: (
								Object.values(this.props.sites[this.props.currentSite].tagTypes).find(
									(o) => o.id === tag[2]
								) || { color: "" }
							).color
						}}
						key={tag[0]}
						data-tag={tag[0]}>
						<div className="actions">
							{this.props.sites[this.props.currentSite].supports.wiki ? (
								<div className="info" onClick={() => this.props.startViewingWiki(tag[0])}>
									?
								</div>
							) : (
								""
							)}
							<div className="add" onClick={this.props.addTag}>
								+
							</div>
							<div className="substract" onClick={this.props.excludeTag}>
								-
							</div>
						</div>
						<div
							onClick={this.props.searchTag}
							className={tag[0].length > 23 ? (tag[0].length > 28 ? "_verylong" : "_long") : ""}>
							{tag[0].replace(/_/g, " ")}
							<div className="count">{tag[1] > 0 ? tag[1] : ""}</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

class PostTags extends React.Component {
	render() {
		const post =
			this.props.post.post !== -1 && this.props.posts.hasOwnProperty(this.props.post.post)
				? this.props.posts[this.props.post.post]
				: { tags: [] };

		return (
			<div className="tags">
				{this.props.currentSite
					? Object.keys(this.props.sites[this.props.currentSite].tagTypes).map((name) => {
							const type = this.props.sites[this.props.currentSite].tagTypes[name];

							const tags = post.tags.map((tag) => {
								if (tag[2] !== type.id) return [];
								else
									return (
										<div className="tag" key={tag[0]} data-tag={tag[0]}>
											<div className="actions">
												{this.props.sites[this.props.currentSite].supports.wiki ? (
													<div
														className="info"
														onClick={() => this.props.startViewingWiki(tag[0])}>
														?
													</div>
												) : (
													""
												)}
												<div className="add" onClick={this.props.addTag}>
													+
												</div>
												<div className="substract" onClick={this.props.excludeTag}>
													-
												</div>
											</div>
											<div
												onClick={this.props.searchTag}
												className={
													tag[0].length > 23
														? tag[0].length > 28
															? "_verylong"
															: "_long"
														: ""
												}>
												{tag[0].replace(/_/g, " ")}
												<div className="count">{tag[1] > 0 ? tag[1] : "..."}</div>
											</div>
										</div>
									);
							});

							return tags.flat().length > 0 ? (
								<div className="type" style={{ color: type.color }} key={name}>
									<div className="name">{name}</div>
									<div>{tags}</div>
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
	searchTag = (e) => {
		let tag = e.currentTarget.parentNode.dataset.tag;
		if (this.props.query !== tag) {
			this.props.setQueryBuffer(tag);
			this.props.search();
		}
	};

	addTag = (e) => {
		let tag = e.currentTarget.parentNode.parentNode.dataset.tag;

		if (this.props.queryBuffer.split(" ").includes("-" + tag)) {
			this.props.setQueryBuffer(this.props.queryBuffer.replace(new RegExp("-" + tag, "g"), tag));
			this.props.search();
		} else if (!this.props.queryBuffer.split(" ").includes(tag)) {
			this.props.setQueryBuffer(this.props.queryBuffer + " " + tag);
			this.props.search();
		}
	};

	excludeTag = (e) => {
		let tag = e.currentTarget.parentNode.parentNode.dataset.tag;

		if (this.props.queryBuffer.split(" ").includes(tag)) {
			if (tag.includes(":")) this.props.setQueryBuffer(this.props.queryBuffer.replace(new RegExp(tag, "g"), ""));
			else {
				this.props.setQueryBuffer(this.props.queryBuffer.replace(new RegExp(tag, "g"), "-" + tag));
				this.props.search();
			}
		} else if (!this.props.queryBuffer.split(" ").includes("-" + tag) && !tag.includes(":")) {
			this.props.setQueryBuffer(this.props.queryBuffer + " -" + tag);
			this.props.search();
		}
	};

	render() {
		return this.props.postView ? (
			<PostTags {...this.props} searchTag={this.searchTag} addTag={this.addTag} excludeTag={this.excludeTag} />
		) : (
			<PopularTags {...this.props} searchTag={this.searchTag} addTag={this.addTag} excludeTag={this.excludeTag} />
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		popularTags: state.site.popularTags,
		sites: state.site.sites,
		currentSite: state.site.currentSite,
		posts: state.post.posts,
		post: state.post.postView,
		queryBuffer: state.post.search.queryBuffer,
		query: state.post.search.query
	};
};

const mapDispatchToProps = {
	setQueryBuffer: postActions.setQueryBuffer,
	search: postActions.search,
	startViewingWiki: siteActions.startViewingWiki
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tags);
