export const siteActions = {
	ADD_SITE: "ADD_SITE",
	CHANGE_SITE: "CHANGE_SITE",

	FETCH_POPULAR_TAGS: "FETCH_POPULAR_TAGS",
	SET_POPULAR_TAGS: "SET_POPULAR_TAGS",

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
		payload: {
			tags
		}
	})
};
