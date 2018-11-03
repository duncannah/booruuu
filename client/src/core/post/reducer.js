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
			file_size: 0,
			md5: "",
			thumb: {
				url: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
				width: 1,
				height: 1
			},
			sample: {
				url: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
				width: 1,
				height: 1
			},
			full: {
				url: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
				width: 1,
				height: 1
			}
		}
		/*post: {
			id: 1020678,
			tags: [
				{ id: 23146, name: "mastiff", count: 160, type: 5 },
				{ id: 59683, name: "4:3", count: 30070, type: 0 },
				{ id: 512222, name: "sherpa_hat", count: 59, type: 0 },
				{ id: 197425, name: "2016", count: 108258, type: 0 },
				{ id: 1989, name: "fur", count: 500547, type: 0 },
				{ id: 121378, name: "white_fur", count: 138871, type: 0 },
				{ id: 208564, name: "tibetan_mastiff", count: 115, type: 5 },
				{ id: 168227, name: "duo", count: 462269, type: 0 },
				{ id: 3137, name: "eyes_closed", count: 132720, type: 0 },
				{ id: 1005, name: "kissing", count: 21058, type: 0 },
				{ id: 78, name: "male", count: 796663, type: 0 },
				{ id: 145338, name: "male/male", count: 142087, type: 0 },
				{ id: 109052, name: "eyewear", count: 87858, type: 0 },
				{ id: 1000, name: "glasses", count: 56874, type: 0 },
				{ id: 7115, name: "anthro", count: 973360, type: 0 },
				{ id: 974, name: "video_games", count: 340001, type: 0 },
				{ id: 4303, name: "nintendo", count: 205873, type: 3 },
				{ id: 4026, name: "animal_crossing", count: 8642, type: 3 },
				{ id: 46410, name: "k.k._slider", count: 119, type: 4 },
				{ id: 345140, name: "rock_dog", count: 149, type: 3 },
				{ id: 382557, name: "bodi", count: 94, type: 4 },
				{ id: 12054, name: "mammal", count: 1170374, type: 5 },
				{ id: 1068, name: "canine", count: 427829, type: 5 },
				{ id: 4895, name: "dog", count: 103096, type: 5 },
				{ id: 23373, name: "eclipsewolf", count: 178, type: 1 }
			],
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel vehicula ligula. Quisque vel dui id leo posuere euismod vel quis dolor. Integer hendrerit congue elit bibendum interdum. Mauris sem dolor, suscipit quis magna eu, semper dictum lacus. Curabitur cursus accumsan pharetra. Curabitur in purus augue. Nulla diam lectus, tristique at elit quis, commodo pulvinar urna.",
			score: 101,
			fav: 245,
			time: 1476336596,
			author: "Pokelova",
			sources: ["http://www.furaffinity.net/view/21411990/"],
			file_size: 242518,
			md5: "34da06b9dd0ba5bf6f595c58a6b4f6ee",

			thumb: {
				url: "https://static1.e621.net/data/preview/34/da/34da06b9dd0ba5bf6f595c58a6b4f6ee.jpg",
				width: 150,
				height: 112
			},

			sample: {
				url: "https://static1.e621.net/data/34/da/34da06b9dd0ba5bf6f595c58a6b4f6ee.jpg",
				width: 800,
				height: 600
			},

			full: {
				url: "https://static1.e621.net/data/34/da/34da06b9dd0ba5bf6f595c58a6b4f6ee.jpg",
				width: 800,
				height: 600
			}
		}*/
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

		case postActions.SET_POST_TAGS:
			return {
				...state,
				postView: {
					...state.postView,
					post: {
						...state.postView.post,
						tags: action.payload
					}
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
