import React from "react";
import { CSSTransition } from "react-transition-group";

import { APP_NAME, APP_VERSION } from "../../core/constants";

import "./welcome.scss";

class Welcome extends React.Component {
	render = () => (
		<CSSTransition timeout={200} classNames="" in={this.props.in} unmountOnExit>
			<div className="welcome" onClick={this.props.close}>
				<div
					className="inner"
					onClick={(e) => {
						e.stopPropagation();
					}}>
					<div className="content">
						<div className="top">welcome to</div>
						<div className="name">{APP_NAME}</div>
						<div className="bottom">version {APP_VERSION}</div>

						<div className="desc">a browser-based imageboard viewer</div>

						<p>this is still in alpha stage, so bugs are pretty common; most things will just not work.</p>

						<p className="_italic">pick a site on the top right to start browsing.</p>

						<p className="link">
							<a href="https://github.com/duncannah/booruuu" target="_blank" rel="noopener noreferrer">
								https://github.com/duncannah/booruuu
							</a>
						</p>
					</div>
					<div className="btns">
						<div className="btn" onClick={this.props.close}>
							ok!
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
}

export default Welcome;
