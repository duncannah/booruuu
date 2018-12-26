import { take, put, fork, select, takeLatest } from "redux-saga/effects";

import { appActions } from "../app";
import { siteActions } from "./actions";

import { API } from "../api";

function* fetchSites() {
	yield put(appActions.loading("fetchSites", true));

	try {
		const body = yield API.request("sites");

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

		const body = yield API.request(`sites/${site}/tag/list${query ? "?q=" + encodeURIComponent(query) : ""}`);

		yield put(siteActions.setPopularTags(body.tags));
	} catch (error) {
		yield put(appActions.notify(`Couldn't fetch popular tags`, error));
	}
}

function* fetchWiki({ payload }) {
	try {
		let site = yield select((state) => state.site.currentSite);

		const body = yield API.request(`sites/${site}/wiki/show?title=${encodeURIComponent(payload.tag)}`);

		if (body.description) yield put(siteActions.setWikiInfo(body.description));
		else yield put(siteActions.setWikiInfo("[Wiki page doesn't exist.]"));
	} catch (error) {
		yield put(appActions.notify(`Couldn't fetch wiki description`, error));
		yield put(siteActions.setWikiInfo(`[Failed to fetch wiki description.]`));
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

function* watchStartWiki() {
	yield takeLatest(siteActions.START_VIEWING_WIKI, fetchWiki);
}

// ROOT

export const siteSagas = [fork(watchInitApp), fork(watchSiteChange), fork(watchFetchPopularTags), fork(watchStartWiki)];
