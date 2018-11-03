import { takeLatest, fork } from 'redux-saga/effects';

import { appActions } from './actions';

function* consoleError({payload}) {
	if (payload.error)
		yield console.error(payload.error);
}

// WATCHERS

function* watchNotify() {
	yield takeLatest(appActions.NOTIFY, consoleError);
}

// ROOT

export const appSagas = [
	fork(watchNotify)
];