import React from "react";
import { APP_NAME, APP_VERSION } from "../../core/constants";

import "./welcome.scss";

const Welcome = () => (
	<div className="welcome">
		<div className="header">
			<div className="top">welcome to</div>
			<div className="name">{APP_NAME}</div>
			<div className="bottom">version {APP_VERSION}</div>

			<div className="desc">a browser-based imageboard viewer</div>
		</div>

		<p>this is still in alpha stage, so bugs are pretty common; most things will just not work.</p>

		<p className="_italic">pick a site on the top right to start browsing.</p>

		<p className="link">
			<a href="https://github.com/duncannah/booruuu" target="_blank" rel="noopener noreferrer">
				https://github.com/duncannah/booruuu
			</a>
		</p>
	</div>
);

export default Welcome;
