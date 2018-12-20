import React from "react";
import classNames from "classnames";

import "./icon.scss";

const Icon = ({ className, name }) => (
	<svg className={classNames("icon", className)}>
		<use xlinkHref={`#icon-${name}`} />
	</svg>
);

export default Icon;
