import { put, fork, select, takeLatest, takeEvery } from "redux-saga/effects";

import { appActions } from "../app";
import { siteActions } from "../site";
import { postActions } from "./actions";

import { API } from "../api";

function* fetchPosts(wipe = false) {
	yield put(appActions.loading("fetchPosts", true));

	try {
		let site = yield select((state) => state.site.currentSite);

		let options = {};
		let search = yield select((state) => state.post.search);
		if (search.isSearching) options.q = search.query;

		let query = options
			? "?" +
			  Object.keys(options)
					.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`)
					.join("&")
			: "";

		const body = yield API.request(`sites/${site}/post/list${query}`);

		if (wipe) yield put(postActions.resetPosts());

		yield put(postActions.addPosts(body.posts));
	} catch (error) {
		yield put(appActions.notify(`Couldn't fetch posts`, error));
	}

	yield put(appActions.loading("fetchPosts", false));
}

function* fetchPostTags(payload) {
	try {
		let site = yield select((state) => state.site.currentSite);

		const body = yield API.request(`sites/${site}/post/tags?id=${payload}`);

		yield put(postActions.setPostTags(body.tags.sort()));
	} catch (e) {
		yield put(appActions.notify(`Couldn't fetch tags`, e));
	}
}

function* fetchPostInfo(payload) {
	// TODO: request post info
}

function* siteChanged() {
	yield put(postActions.setQueryBuffer(""));
	yield put(postActions.search());
}

function* search() {
	yield put(siteActions.fetchPopularTags());
	yield fork(fetchPosts, true);
}

function* postViewOn({ payload }) {
	let site = yield select((state) => state.site.sites[state.site.currentSite]);
	let engine = yield select((state) => state.site.engines[site.engine]);

	if (engine.seperateTagReq) yield fork(fetchPostTags, payload);

	if (engine.seperateTagReq !== 2) {
		let tags = yield select((state) => state.post.posts.find((p) => p.id === payload).tags);
		yield put(postActions.setPostTags(tags.sort()));
	}

	if (engine.seperateInfoReq) yield fork(fetchPostInfo, payload);

	if (engine.seperateInfoReq !== 2) {
		let info = yield select((state) => state.post.posts.find((p) => p.id === payload));
		yield put(postActions.setPostInfo(info));
	}
}

// WATCHERS

function* watchSiteChanged() {
	yield takeLatest(siteActions.CHANGE_SITE, siteChanged);
}

function* watchSearch() {
	yield takeLatest(postActions.SEARCH, search);
}

function* watchPostViewOn() {
	yield takeEvery(postActions.START_VIEWING_POST, postViewOn);
}

// ROOT

export const postSagas = [fork(watchSiteChanged), fork(watchSearch), fork(watchPostViewOn)];
