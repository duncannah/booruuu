import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import "./wiki.scss";

import Icon from "../icon";

import { siteActions } from "../../../core/site";

class Wiki extends React.Component {
	render() {
		return (
			<CSSTransition timeout={400} classNames="" in={this.props.wiki.on} unmountOnExit>
				<div className="wiki" onClick={this.props.stopViewingWiki}>
					<div
						className="inner"
						onClick={(e) => {
							e.stopPropagation();
						}}>
						<div className="title">wiki: {this.props.wiki.name}</div>
						<div className="content">
							{this.props.wiki.description !== "" ? (
								this.props.wiki.description
									.replace(/\[(?:[^[]*?)\]([^[]*?)\[\/(?:[^]]*?)\]/gs, "$1") // remove unknown bbcode
									.replace(/thumb #\d*/g, "") // remove embedded posts
									.trim()
									.match(/(\[\[.*?\]\]|.+?)/gs)
									.map((r, i) => {
										if (r === "\n") return <br key={i} />;

										if (r.substr(0, 2) === "[[" && r.substr(-2) === "]]") {
											let name = r.substr(2, r.length - 4);

											return (
												// eslint-disable-next-line
												<a // eslint-disable-next-line
													href="javascript:;"
													onClick={() => {
														this.props.startViewingWiki(
															name
																.substr(
																	0,
																	name.indexOf("|") > 0
																		? name.indexOf("|")
																		: undefined
																)
																.substr(
																	0,
																	name.indexOf("#") > 0
																		? name.indexOf("#")
																		: undefined
																)
																.replace(" ", "_")
														);
													}}
													key={i}>
													{name.substr(name.indexOf("|") + 1)}
												</a>
											);
										}

										return r;
									})
							) : (
								<Icon className="spinner" name="spinner" />
							)}
						</div>
						<div className="btns">
							<div className="btnClose" onClick={this.props.stopViewingWiki}>
								close
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
		wiki: state.site.wiki
	};
};

const mapDispatchToProps = {
	startViewingWiki: siteActions.startViewingWiki,
	setWikiInfo: siteActions.setWikiInfo,
	stopViewingWiki: siteActions.stopViewingWiki
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Wiki);
