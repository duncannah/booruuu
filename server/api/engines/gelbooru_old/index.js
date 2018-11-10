module.exports = {
	post: require("./post"),
	tag: require("./tag"),

	engineInfo: {
		seperateTagReq: true,
		seperateInfoReq: false,

		relatedTagsInclInPosts: false
	}
};
