import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { appActions } from "../core/app";

import { Icon, Sidebar, Posts, PostView, Settings, Wiki, Notifications, Welcome } from "./components";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settingsPopup: false
		};
	}

	componentDidMount() {
		this.props.initApp();
	}

	render() {
		return (
			<div
				className={classNames({
					app: true,
					loading: !!this.props.loading.length,
					mac: navigator.platform === "MacIntel",
					win: ["Win32", "Win64"].includes(navigator.platform),
					linux: !["MacIntel", "Win32", "Win64"].includes(navigator.platform),
					webkit: "WebkitAppearance" in document.documentElement.style,
					chrome: !!window.chrome && !!window.chrome.webstore,
					firefox: typeof InstallTrigger !== "undefined",
					edge: !!window.StyleMedia,

					[`color-${this.props.settings.color}`]: true
				})}>
				<div className="loader">
					<Icon className="spinner" name="spinner" />
				</div>

				<Sidebar
					openSettingsPopup={() => this.setState({ settingsPopup: true })}
					openWelcomeScreen={() => this.props.setSettings({ welcomeScreen: 1 })}
				/>
				<Posts />

				<PostView
					in={this.props.postViewOn}
					openSettingsPopup={() => this.setState({ settingsPopup: true })}
					openWelcomeScreen={() => this.props.setSettings({ welcomeScreen: 1 })}
				/>

				<Settings in={this.state.settingsPopup} close={() => this.setState({ settingsPopup: false })} />
				<Wiki />

				<Welcome
					in={!!this.props.settings.welcomeScreen}
					close={() => this.props.setSettings({ welcomeScreen: 0 })}
				/>

				<Notifications />
			</div>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		loading: state.app.loading,
		settings: state.app.settings,
		postViewOn: state.post.postView.on
	};
};

const mapDispatchToProps = {
	initApp: appActions.initApp,
	setSettings: appActions.setSettings
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
