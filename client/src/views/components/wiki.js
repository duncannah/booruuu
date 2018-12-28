import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import sanitizeHTML from "sanitize-html";

import "./wiki.scss";

import { Icon } from "./";

import { siteActions } from "../../core/site";
import { postActions } from "../../core/post/actions";

class Wiki extends React.Component {
	onContentClick = (e) => {
		if ("wikipage" in e.target.dataset) {
			e.preventDefault();

			this.props.startViewingWiki(e.target.dataset.wikipage.toLowerCase());
		}
	};

	render() {
		return (
			<CSSTransition timeout={200} classNames="" in={this.props.wiki.on} unmountOnExit>
				<div className="wiki" onClick={this.props.stopViewingWiki}>
					<div
						className="inner"
						onClick={(e) => {
							e.stopPropagation();
						}}>
						<div className="title">wiki: {this.props.wiki.name}</div>
						<div
							className="content"
							onClick={this.onContentClick}
							dangerouslySetInnerHTML={
								this.props.wiki.description
									? {
											__html: sanitizeHTML(this.props.wiki.description, {
												allowedTags: [
													"h3",
													"h4",
													"h5",
													"h6",
													"blockquote",
													"p",
													"a",
													"ul",
													"ol",
													"li",
													"b",
													"i",
													"strong",
													"em",
													"strike",
													"code",
													"hr",
													"br",
													"table",
													"thead",
													"caption",
													"tbody",
													"tr",
													"th",
													"td",
													"img"
												],
												allowedAttributes: {
													a: ["href", "target", "data-wikipage", "data-external", "title"]
												},
												exclusiveFilter: (f) => f.tag === "p" && !f.text.trim(),
												transformTags: {
													a: (tagName, attribs) => {
														if (attribs.href)
															if (attribs.href.startsWith("/wiki/show/"))
																return {
																	tagName: "a",
																	attribs: {
																		href: "#",
																		"data-wikipage": decodeURIComponent(
																			attribs.href.substr(11)
																		),
																		title: decodeURIComponent(
																			attribs.href.substr(11)
																		),
																		target: true
																	}
																};
															else if (!attribs.href.match(/^http(s|):\/\//))
																return {
																	tagName,
																	attribs: {
																		...attribs,
																		href:
																			this.props.sites[this.props.currentSite]
																				.url +
																			(attribs.href.startsWith("/") ? "" : "/") +
																			attribs.href,
																		target: "_blank",
																		"data-external": true
																	}
																};

														return {
															tagName,
															attribs: {
																...attribs,
																target: "_blank",
																"data-external": true
															}
														};
													}
												},
												textFilter: (t) =>
													t
														.replace(
															/\[\[(.+?)\|(.+?)]]/g,
															`<a href="#" data-wikipage="$1" title="$1">$2</a>`
														)
														.replace(
															/\[\[([^|[\]]+?)]]/g,
															`<a href="#" data-wikipage="$1" title="$1">$1</a>`
														)
											})
									  }
									: undefined
							}>
							{!this.props.wiki.description ? <Icon className="spinner" name="spinner" /> : null}
						</div>
						<div className="btns">
							<div className="btnsLeft">
								<div
									className="btn"
									onClick={() => {
										this.props.setQueryBuffer(this.props.wiki.name);
										this.props.search();
										this.props.stopViewingWiki();
									}}>
									view posts
								</div>
							</div>
							<div className="btnsRight">
								<div className="btn" onClick={this.props.stopViewingWiki}>
									close
								</div>
							</div>
						</div>
					</div>
				</div>
			</CSSTransition>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		wiki: state.site.wiki,
		sites: state.site.sites,
		currentSite: state.site.currentSite
	};
};

const mapDispatchToProps = {
	startViewingWiki: siteActions.startViewingWiki,
	setWikiInfo: siteActions.setWikiInfo,
	stopViewingWiki: siteActions.stopViewingWiki,
	setQueryBuffer: postActions.setQueryBuffer,
	search: postActions.search
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Wiki);
