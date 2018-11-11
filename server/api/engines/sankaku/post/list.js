const { requestJSON } = require("../../../request");
const { IMG_FLASH } = require("../../../constants");

module.exports = async (req, res, site) => {
	// TODO: pages

	const json = await requestJSON(
		`https://capi-v2.sankakucomplex.com/posts?page=1&limit=%LT&tags=${encodeURIComponent(req.query.q || "")}`,
		true
	);

	let posts = [];

	for (const post of json) {
		// sankaku preview is bigger than 150px
		let p_w = (p_h = 150);

		if (post.width > post.height) p_h = 150 / (post.width / post.height);
		else if (post.width < post.height) p_w = 150 * (post.width / post.height);

		const kind = post.file_type
			? post.file_type.substr(post.file_type.lastIndexOf("/") + 1)
			: post.file_url.substr(0, post.file_url.indexOf("?")).substr(post.file_url.lastIndexOf(".") + 1);

		posts.push({
			_: {
				needsTags: false,
				needsInfo: false,

				hasNotes: post.has_notes
			},
			id: post.id,
			tags: post.tags.map((t) => [t.name, t.count, t.type]),
			description: "",
			score: post.total_score,
			fav: post.fav_count,
			time: post.created_at.s,
			author: post.author.name,
			sources: [post.source],
			fileSize: post.file_size,
			kind: kind,
			md5: post.md5,
			rating: { s: 0, q: 1, e: 2 }[post.rating],

			thumb: [kind !== "swf" ? post.preview_url : IMG_FLASH, p_w, p_h],

			sample: [kind !== "swf" ? post.sample_url : IMG_FLASH, post.sample_width, post.sample_height],

			full: [post.file_url, post.width, post.height]
		});
	}

	res.json({ posts: posts });
};
