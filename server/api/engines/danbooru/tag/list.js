const { requestHTML } = require("../../../request");

module.exports = async (req, res, site) => {
	// TODO: tag types

	let url = `${site.url}/posts?${req.query.hasOwnProperty("q") ? "tags=" + encodeURIComponent(req.query.q) : ""}`;

	const $ = await requestHTML(url);

	let tags = [];

	$("#tag-box ul li a.search-tag").each((i, el) => {
		tags.push({
			name: decodeURIComponent(
				$(el)
					.attr("href")
					.replace("/posts?tags=", "")
			),
			count: $(el)
				.next()
				.text()
				.endsWith("k")
				? $(el)
						.next()
						.text()
						.replace("k", "") * 1000
				: parseInt(
						$(el)
							.next()
							.text()
				  )
		});
	});

	res.json({ tags: tags });
};
