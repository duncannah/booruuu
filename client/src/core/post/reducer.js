import { postActions } from "./actions";

const initialState = {
	posts: [],

	search: {
		isSearching: false,
		queryBuffer: "",
		query: ""
	},

	postView: {
		on: false,
		post: -1
	}
};

export function postReducer(state = initialState, action) {
	switch (action.type) {
		case postActions.ADD_POSTS:
			return {
				...state,
				posts: action.payload
			};

		case postActions.RESET_POSTS:
			return {
				...state,
				posts: []
			};

		case postActions.SEARCH:
			return {
				...state,
				search: {
					...state.search,
					isSearching: !!state.search.queryBuffer,
					query: state.search.queryBuffer || ""
				},
				postView: {
					...state.postView,
					on: false
				}
			};

		case postActions.SET_QUERY_BUFFER:
			return {
				...state,
				search: { ...state.search, queryBuffer: action.payload }
			};

		case postActions.START_VIEWING_POST:
			return {
				...state,
				postView: {
					...state.postView,
					on: true,
					post: action.payload
				}
			};

		case postActions.STOP_VIEWING_POST:
			return {
				...state,
				postView: {
					...state.postView,
					on: false
				}
			};

		case postActions.SET_POST_INFO:
			let toReturn = {
				...state
			};

			const index = state.posts.findIndex((p) => p.id === action.payload.id);

			if (index !== -1) toReturn.posts[index] = { ...toReturn.posts[index], ...action.payload };

			return toReturn;

		default:
			return state;
	}
}
