import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { siteActions } from "../../../core/site";

import styles from "./site-selector.module.scss";

class SiteSelector extends React.Component {
	_select = (e) => {
		this.props.changeSite(e.target.value);
	};

	render() {
		const name = this.props.currentSite ? this.props.sites[this.props.currentSite].name : "\u00A0";

		return (
			<div className={styles.siteSelector}>
				<select className={styles.select} onChange={this._select} value={this.props.currentSite}>
					{(() => {
						return Object.keys(this.props.sites).map((val) => {
							return (
								<option value={val} key={val}>
									{this.props.sites[val].name}
									{this.props.sites[val].nsfw ? " 🔞" : ""}
								</option>
							);
						});
					})()}
				</select>
				<span className={classNames({ [styles.current]: true, [styles._long]: name.length >= 23 })}>
					{name}
				</span>
				<span className={styles.arrow} />
			</div>
		);
	}
}

// CONNECT

const mapStateToProps = (state) => {
	return {
		sites: state.site.sites,
		currentSite: state.site.currentSite
	};
};

const mapDispatchToProps = {
	//addSite: siteActions.addSite,
	changeSite: siteActions.changeSite
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SiteSelector);
