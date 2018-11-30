import { takeLatest, takeEvery, fork } from "redux-saga/effects";

import { appActions } from "./actions";

function* consoleError({ payload }) {
	if (payload.error) yield console.error(payload.error);
}

function* settingsSet({ payload }) {
	yield Object.keys(payload).forEach((s) => {
		localStorage.setItem("settings." + s, payload[s]);
	});
}

// WATCHERS

function* watchNotify() {
	yield takeLatest(appActions.NOTIFY, consoleError);
}

function* watchSettings() {
	yield takeEvery(appActions.SET_SETTINGS, settingsSet);
}

// ROOT

export const appSagas = [fork(watchNotify), fork(watchSettings)];
