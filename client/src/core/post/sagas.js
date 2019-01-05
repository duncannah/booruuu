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

		yield put(
			postActions.addPosts(
				body.posts.map((p) => {
					return { ...p, tags: p.tags.sort() };
				})
			)
		);
	} catch (error) {
		yield put(appActions.notify(`Couldn't fetch posts`, error));
	}

	yield put(appActions.loading("fetchPosts", false));
}

function* fetchPostTags(payload) {
	try {
		const site = yield select((state) => state.site.currentSite);

		const body = yield API.request(`sites/${site}/post/tags?id=${payload}`);

		const info = yield select((state) => state.post.posts.find((p) => p.id === payload));

		yield put(postActions.setPostInfo({ id: payload, tags: body.tags.sort(), _: { ...info._, needsTags: false } }));
	} catch (e) {
		yield put(appActions.notify(`Couldn't fetch tags`, e));
	}
}

function* fetchPostInfo(payload) {
	try {
		const site = yield select((state) => state.site.currentSite);

		const body = yield API.request(`sites/${site}/post/info?id=${payload}`);

		const info = yield select((state) => state.post.posts.find((p) => p.id === payload));

		yield put(
			postActions.setPostInfo({ id: payload, ...body.info, _: { ...info._, needsInfo: false, needsTags: false } })
		);
	} catch (e) {
		yield put(appActions.notify(`Couldn't fetch info`, e));
	}
}

function* fetchPostNotes(payload) {
	try {
		const site = yield select((state) => state.site.currentSite);

		const body = yield API.request(`sites/${site}/note/list?id=${payload}`);

		const info = yield select((state) => state.post.posts.find((p) => p.id === payload));

		yield put(postActions.setPostInfo({ id: payload, notes: body.notes, _: { ...info._, needsNotes: false } }));
	} catch (e) {
		yield put(appActions.notify(`Couldn't fetch notes`, e));
	}
}

function* postViewOn({ payload }) {
	const info = yield select((state) => state.post.posts[payload]);
	//info.tags = info.tags ? info.tags.sort() : [];
	//yield put(postActions.setPostInfo(info));

	if (info._.needsInfo) yield fork(fetchPostInfo, info.id);
	else if (info._.needsTags) yield fork(fetchPostTags, info.id);

	if (info._.needsNotes) yield fork(fetchPostNotes, info.id);
}

function* siteChanged() {
	yield put(postActions.setQueryBuffer(""));
	yield put(postActions.search());
}

function* search() {
	yield put(siteActions.fetchPopularTags());
	yield fork(fetchPosts, true);
}

// WATCHERS

function* watchPostViewOn() {
	yield takeEvery(postActions.START_VIEWING_POST, postViewOn);
}

function* watchSiteChanged() {
	yield takeLatest(siteActions.CHANGE_SITE, siteChanged);
}

function* watchSearch() {
	yield takeLatest(postActions.SEARCH, search);
}

// ROOT

export const postSagas = [fork(watchSiteChanged), fork(watchSearch), fork(watchPostViewOn)];
