import { all } from 'redux-saga/effects'

import { appSagas } from './app';
import { siteSagas } from './site';
import { postSagas } from './post';

export default function* sagas() {
	yield all([
		...appSagas,
		...siteSagas,
		...postSagas,
	]);
}