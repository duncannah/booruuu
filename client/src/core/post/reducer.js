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
		post: {
			id: -1,
			tags: [],
			description: "",
			score: 0,
			fav: 0,
			time: 0,
			author: "Anonymous",
			sources: [],
			fileSize: 0,
			md5: "",
			thumb: ["data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 1, 1],
			sample: ["data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 1, 1],
			full: ["data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 1, 1]
		}
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
					post: { ...initialState.postView.post, id: action.payload }
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
			return {
				...state,
				postView: {
					...state.postView,
					post: {
						...state.postView.post,
						...action.payload
					}
				}
			};

		default:
			return state;
	}
}
