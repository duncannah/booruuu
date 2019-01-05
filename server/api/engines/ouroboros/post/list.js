const { requestJSON } = require("../../../request");

module.exports = {
	preferredMethod: "json",

	json: async (req, res, site) => {
		// TODO: pages

		let url = `${site.url}/post/index.json?typed_tags=true&limit=%L&tags=${encodeURIComponent(req.query.q || "")}`;

		const json = await requestJSON(url);

		let posts = [];

		for (const post of json) {
			let tags = [];

			Object.keys(post.tags).map((type) => {
				Object.keys(post.tags[type]).map((tag) => {
					tags.push([
						post.tags[type][tag],
						-1,
						{ general: 0, artist: 1, copyright: 3, character: 4, species: 5 }[type]
					]);
				});
			});

			posts.push({
				_: {
					needsTags: true,
					needsInfo: false,

					needsNotes: post.has_notes
				},
				id: post.id,
				tags: tags,
				description: post.description,
				score: post.score,
				fav: post.fav_count,
				time: post.created_at.s * 1000,
				author: post.author,
				sources: post.sources || [],
				fileSize: post.file_size,
				kind: post.file_ext,
				md5: post.md5,
				rating: { s: 0, q: 1, e: 2 }[post.rating],

				thumb: [post.preview_url, post.preview_width, post.preview_height],

				sample: [post.sample_url, post.sample_width, post.sample_height],

				full: [post.file_url, post.width, post.height]
			});
		}

		res.json({ posts: posts });
	}
};
