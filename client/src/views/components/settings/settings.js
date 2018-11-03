import React from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./settings.module.scss";

class Settings extends React.Component {
	componentDidMount() {
		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape" && this.props.in) this.props.close();
		});
	}

	render() {
		return (
			<CSSTransition timeout={400} classNames={styles} in={this.props.in} unmountOnExit>
				<div className={styles.settings} onClick={this.props.close}>
					<div
						className={styles.inner}
						onClick={(e) => {
							e.stopPropagation();
						}}>
						<div className={styles.title}>settings</div>
						<div className={styles.content}>Hmm, nothing here yet. Maybe check later? (TODO)</div>
						<div className={styles.btns}>
							<div className={styles.btnOK} onClick={this.props.close}>
								ok
							</div>
						</div>
					</div>
				</div>
			</CSSTransition>
		);
	}
}

export default Settings;
