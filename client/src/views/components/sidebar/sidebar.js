import React from "react";
import classNames from "classnames";

import { APP_NAME, APP_VERSION } from "../../../core/constants";
import SiteSelector from "../site-selector";
import Search from "../search";
import Tags from "../tags";
import Icon from "../icon";

import styles from "./sidebar.module.scss";

class Sidebar extends React.Component {
	render() {
		return (
			<div className={classNames({ [styles.sidebar]: true, [styles.postView]: this.props.postView })}>
				<div className={styles.top}>
					<span>{APP_NAME}</span>
					<span>v{APP_VERSION}</span>
				</div>
				<SiteSelector />
				<Search postView={this.props.postView} />
				<div className={styles.inner}>
					<Tags postView={this.props.postView} />
				</div>
				<div className={styles.bottom}>
					<div className={styles.settings} onClick={this.props.openSettingsPopup}>
						<Icon name="settings" />
					</div>
					<a
						className={styles.link}
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
