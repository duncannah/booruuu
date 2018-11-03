const { requestHTML } = require("../../../request");

module.exports = async (req, res, site) => {
	// TODO: pages

	// API either too unstable or they disabled it again
	// so we're HTML scraping
	let url = `${site.url}/?tags=${encodeURIComponent(req.query.q || "")}`;

	const $ = await requestHTML(url);

	let posts = [];

	$(".thumb").each((i, el) => {
		// TODO: replace "true" with "page === 1" when pages are implemented
		if (true && i < 3) return;

		posts.push({
			id: parseInt(
				$(el)
					.attr("id")
					.substr(1)
			),
			tags: $(el)
				.find("img")
				.attr("title")
				.match(/^(.*?) Rating:/)[1]
				.split(" "),
			score: parseInt(
				$(el)
					.find("img")
					.attr("title")
					.match(/Score:(.*?) /)[1]
			),
			fav: -1,
			rating: { Safe: 0, Questionable: 1, Explicit: 2 }[
				$(el)
					.find("img")
					.attr("title")
					.match(/Rating:(.*?) /)[1]
			],
			thumb: {
				url:
					"https://" +
					$(el)
						.find("img")
						.attr("src"),
				width: parseInt(
					$(el)
						.find("img")
						.attr("width")
				),
				height: parseInt(
					$(el)
						.find("img")
						.attr("height")
				)
			}
		});
	});

	/*

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
	}*/

	res.json({ posts: posts });
};
