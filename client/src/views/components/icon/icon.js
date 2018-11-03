import React from 'react';
import classNames from 'classnames';

import styles from './icon.module.scss';

const Icon = ({ className, name }) =>
	<svg className={classNames(styles.icon, className)}>
		<use xlinkHref={`#icon-${name}`} />
	</svg>;

export default Icon;