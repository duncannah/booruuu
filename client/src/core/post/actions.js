export const postActions = {
	ADD_POSTS: "ADD_POSTS",
	RESET_POSTS: "RESET_POSTS",

	SEARCH: "SEARCH",
	SET_QUERY_BUFFER: "SET_QUERY_BUFFER",

	START_VIEWING_POST: "START_VIEWING_POST",
	STOP_VIEWING_POST: "STOP_VIEWING_POST",

	SET_POST_TAGS: "SET_POST_TAGS",
	SET_POST_INFO: "SET_POST_INFO",

	addPosts: (posts) => ({
		type: postActions.ADD_POSTS,
		payload: posts
	}),

	resetPosts: () => ({
		type: postActions.RESET_POSTS
	}),

	search: () => ({
		type: postActions.SEARCH
	}),

	setQueryBuffer: (b) => ({
		type: postActions.SET_QUERY_BUFFER,
		payload: b
	}),

	startViewingPost: (id) => ({
		type: postActions.START_VIEWING_POST,
		payload: id
	}),

	stopViewingPost: () => ({
		type: postActions.STOP_VIEWING_POST
	}),

	setPostInfo: (info) => ({
		type: postActions.SET_POST_INFO,
		payload: info
	})
};
