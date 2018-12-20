export const siteActions = {
	ADD_SITE: "ADD_SITE",
	CHANGE_SITE: "CHANGE_SITE",

	FETCH_POPULAR_TAGS: "FETCH_POPULAR_TAGS",
	SET_POPULAR_TAGS: "SET_POPULAR_TAGS",

	START_VIEWING_WIKI: "START_VIEWING_WIKI",
	SET_WIKI_INFO: "SET_WIKI_INFO",
	STOP_VIEWING_WIKI: "STOP_VIEWING_WIKI",

	addSite: (sites, engines) => ({
		type: siteActions.ADD_SITE,
		payload: {
			sites,
			engines
		}
	}),

	changeSite: (site) => ({
		type: siteActions.CHANGE_SITE,
		payload: {
			site
		}
	}),

	fetchPopularTags: () => ({
		type: siteActions.FETCH_POPULAR_TAGS
	}),

	setPopularTags: (tags) => ({
		type: siteActions.SET_POPULAR_TAGS,
		payload: { tags }
	}),

	startViewingWiki: (tag) => ({
		type: siteActions.START_VIEWING_WIKI,
		payload: { tag }
	}),

	setWikiInfo: (info) => ({
		type: siteActions.SET_WIKI_INFO,
		payload: { info }
	}),

	stopViewingWiki: () => ({
		type: siteActions.STOP_VIEWING_WIKI
	})
};
