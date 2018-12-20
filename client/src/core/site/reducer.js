import { siteActions } from "./actions";

const initialState = {
	sites: {},
	engines: {},
	currentSite: "",

	popularTags: [],

	wiki: {
		on: false,
		name: "",
		description: ""
	}
};

export function siteReducer(state = initialState, action) {
	switch (action.type) {
		case siteActions.ADD_SITE:
			return {
				...state,
				sites: { ...state.sites, ...action.payload.sites },
				engines: { ...state.engines, ...action.payload.engines }
			};

		case siteActions.CHANGE_SITE:
			return {
				...state,
				currentSite: action.payload.site
			};

		case siteActions.SET_POPULAR_TAGS:
			return {
				...state,
				popularTags: action.payload.tags
			};

		case siteActions.START_VIEWING_WIKI:
			return {
				...state,

				wiki: {
					on: true,
					name: action.payload.tag,
					description: ""
				}
			};

		case siteActions.SET_WIKI_INFO:
			return {
				...state,

				wiki: {
					...state.wiki,
					description: action.payload.info
				}
			};

		case siteActions.STOP_VIEWING_WIKI:
			return {
				...state,

				wiki: {
					...state.wiki,
					on: false
				}
			};

		default:
			return state;
	}
}
