import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import "./settings.scss";

import { appActions } from "../../../core/app";

class Settings extends React.Component {
	componentDidMount() {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape" && this.props.in) this.props.close();
		});
	}

	_onClick = () => {
		const node = ReactDOM.findDOMNode(this);

		if (node instanceof HTMLElement) {
			let settings = {
				color: parseInt(node.querySelector(":checked").value)
			};

			this.props.setSettings(settings);

			this.props.close();
		}
	};

	render() {
		return (
			<CSSTransition timeout={400} classNames="" in={this.props.in} unmountOnExit>
				<div className="settings" onClick={this.props.close}>
					<div
						className="inner"
						onClick={(e) => {
							e.stopPropagation();
						}}>
						<div className="title">settings</div>
						<div className="content">
							<table>
								<tbody>
									<tr>
										<td>colors:</td>
										<td>
											<div className="settingColors">
												{["#8a14ff", "#1467ff", "#2814ff", "#8a8a8a"].map((c, i) => (
													<input
														type="radio"
														name="color"
														value={i + 1}
														style={{ backgroundColor: c }}
														defaultChecked={this.props.settings.color === i + 1}
														key={i}
													/>
												))}
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="btns">
							<div className="btnOK" onClick={this._onClick}>
								ok
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
		settings: state.app.settings
	};
};

const mapDispatchToProps = {
	setSettings: appActions.setSettings
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
