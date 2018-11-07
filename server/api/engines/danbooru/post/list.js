const { requestJSON } = require("../../../request");

module.exports = async (req, res, site) => {
	// TODO: pages

	let url = `${site.url}/posts.json?limit=75&tags=${encodeURIComponent(req.query.q || "")}`;

	const json = await requestJSON(url);

	let posts = [];

	for (const post of json) {
		let p_w = (p_h = 150);
		let s_w = (s_h = 850);

		if (post.image_width > post.image_height) {
			p_h = 150 / (post.image_width / post.image_height);
			s_h = 850 / (post.image_width / post.image_height);
		} else if (post.image_width < post.image_height) {
			p_w = 150 * (post.image_width / post.image_height);
			s_w = 850 / (post.image_width / post.image_height);
		}

		// API doesn't specify if post is gold only -- https://danbooru.donmai.us/forum_topics/4788
		if (
			!post.is_deleted &&
			!post.is_banned &&
			!post.tag_string.includes("shota") &&
			!post.tag_string.includes("loli") &&
			!post.tag_string.includes("toddlercon")
		)
			posts.push({
				id: post.id,
				tags: [
					...post.tag_string_general.split(" ").map((tag) => [tag, -1, 0]),
					...post.tag_string_artist.split(" ").map((tag) => [tag, -1, 1]),
					...post.tag_string_copyright.split(" ").map((tag) => [tag, -1, 3]),
					...post.tag_string_character.split(" ").map((tag) => [tag, -1, 4]),
					...post.tag_string_meta.split(" ").map((tag) => [tag, -1, 5])
				],
				description: "",
				score: post.score,
				fav: post.fav_count,
				time: new Date(post.created_at).getTime(),
				author: post.uploader_name,
				sources: [post.source],
				fileSize: post.file_size,
				kind: post.file_ext,
				md5: post.md5,
				rating: { s: 0, q: 1, e: 2 }[post.rating],

				thumb: [post.preview_file_url, p_w, p_h],

				sample: [post.has_large ? post.large_file_url : post.preview_file_url, s_w, s_h],

				full: [post.file_url, post.image_width, post.image_height]
			});
	}

	res.json({ posts: posts });
};
