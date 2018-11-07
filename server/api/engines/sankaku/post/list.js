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

		let toPush = {
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
			kind: "png",
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
		};

		if (toPush.tags.includes("video")) toPush.kind = "mp4";
		else if (toPush.tags.includes("flash")) toPush.kind = "swf";

		posts.push(toPush);
	});

	res.json({ posts: posts });
};
