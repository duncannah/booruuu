const { requestJSON } = require("../../../request");

module.exports = async (req, res, site) => {
	// TODO: pages

	let url = `${site.url}/index.php?page=dapi&s=post&q=index&json=1&limit=%L&tags=${encodeURIComponent(
		req.query.q || ""
	)}`;

	const json = await requestJSON(url);

	let posts = [];

	for (const post of json) {
		let p_w = (p_h = 150);

		if (post.width > post.height) p_h = 150 / (post.width / post.height);
		else if (post.width < post.height) p_w = 150 * (post.width / post.height);

		posts.push({
			_: {
				needsTags: true,
				needsInfo: false,

				needsNotes: false
			},
			id: post.id,
			tags: [...post.tags.split(" ").map((t) => [t, -1, 0])],
			description: "",
			score: post.score,
			fav: -1,
			time: new Date(post.created_at).getTime(),
			author: post.owner,
			sources: [post.source],
			fileSize: 0,
			kind: post.image.substr(post.image.lastIndexOf(".") + 1),
			md5: post.md5,
			rating: site.nsfw ? { s: 0, q: 1, e: 2 }[post.rating] : 0,

			thumb: [`${site.url}/thumbnails/${post.directory}/thumbnail_${post.hash}.jpg`, p_w, p_h],

			sample: [
				post.sample
					? `${site.url}/samples/${post.directory}/sample_${post.hash}.jpg`
					: `${site.url}/thumbnails/${post.directory}/thumbnail_${post.hash}.jpg`,

				post.sample_width,
				post.sample_height
			],

			full: [post.file_url, post.width, post.height]
		});
	}

	res.json({ posts: posts });
};
