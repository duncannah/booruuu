import React from "react";

import { APP_NAME, APP_VERSION } from "../../core/constants";

import { SiteSelector, Search, Tags } from "./";

import "./sidebar.scss";

class Sidebar extends React.Component {
	render() {
		return (
			<div className="sidebar">
				<div className="top">
					<span>{APP_NAME}</span>
					<span>v{APP_VERSION}</span>
				</div>
				<SiteSelector />
				<Search postView={this.props.postView} />
				<div className="inner">
					<Tags postView={this.props.postView} />
				</div>
				<div className="bottom">
					<div className="settingsBtn" onClick={this.props.openSettingsPopup}>
						<div className="icon">settings</div>
					</div>
					<a
						className="link"
						href="https://github.com/duncannah/booruuu"
						target="_blank"
						rel="noopener noreferrer">
						@duncannah/booruuu
					</a>
				</div>
			</div>
		);
	}
}

export default Sidebar;
