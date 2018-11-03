const { requestJSON } = require("../../../request");

module.exports = async (req, res, site) => {
	// TODO: pages

	let url = `${site.url}/post/index.json?typed_tags=true&limit=75&tags=${encodeURIComponent(req.query.q || "")}`;

	const json = await requestJSON(url);

	let posts = [];

	for (const post of json) {
		let w = (h = 150);
		if (!post.hasOwnProperty("preview_width")) {
			if (post.width > post.height) h = 150 / (post.width / post.height);
			else if (post.width < post.height) w = 150 * (post.width / post.height);
		}

		posts.push({
			id: post.id,
			tags: post.tags,
			score: post.score,
			fav: post.fav_count,
			rating: { s: 0, q: 1, e: 2 }[post.rating],
			thumb: {
				url: post.preview_url,
				width: Math.floor(post.preview_width || w),
				height: Math.floor(post.preview_height || h)
			}
		});
	}

	res.json({ posts: posts });
};
