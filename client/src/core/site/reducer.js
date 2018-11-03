import { siteActions } from "./actions";

const initialState = {
	sites: {},
	engines: {},
	currentSite: "",

	popularTags: []
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

		default:
			return state;
	}
}
