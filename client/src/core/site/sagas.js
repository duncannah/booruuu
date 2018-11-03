import { take, put, fork, select, takeLatest } from "redux-saga/effects";

import { appActions } from "../app";
import { siteActions } from "./actions";

// TODO: create a custom function for requests

function* fetchSites() {
	yield put(appActions.loading("fetchSites", true));

	try {
		const response = yield fetch("./api/sites");
		if (!response.ok) throw Error();

		const body = yield response.json();
		if (body.error) throw Error(`Server said "${body.errorMessage}"`);
		if (typeof body.sites !== "object" || typeof body.engines !== "object") throw Error();

		yield put(siteActions.addSite(body.sites, body.engines));
		yield put(siteActions.changeSite(Object.keys(body.sites)[0]));
	} catch (error) {
		yield put(appActions.initFailed());
	}

	yield put(appActions.loading("fetchSites", false));
}

function* fetchPopularTags() {
	try {
		let site = yield select((state) => state.site.currentSite);
		let query = yield select((state) => state.post.search.query);

		const response = yield fetch(`./api/sites/${site}/tag/list${query ? "?q=" + encodeURIComponent(query) : ""}`);
		if (!response.ok) throw Error();

		const body = yield response.json();
		if (body.error) throw Error(`Server said "${body.errorMessage}"`);
		if (typeof body.tags !== "object") throw Error();

		yield put(siteActions.setPopularTags(body.tags));
	} catch (error) {
		yield put(appActions.notify(`Couldn't fetch popular tags`, error));
	}
}

// WATCHERS

function* watchInitApp() {
	yield take(appActions.INIT_APP);
	yield fork(fetchSites);
}

function* watchSiteChange() {
	//yield takeLatest(siteActions.CHANGE_SITE, fetchPopularTags);
}

function* watchFetchPopularTags() {
	yield takeLatest(siteActions.FETCH_POPULAR_TAGS, fetchPopularTags);
}

// ROOT

export const siteSagas = [fork(watchInitApp), fork(watchSiteChange), fork(watchFetchPopularTags)];
