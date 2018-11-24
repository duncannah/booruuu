const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	html: async (req, res, site) => {
		// TODO: tag types

		let url = `${site.url}/posts?${req.query.hasOwnProperty("q") ? "tags=" + encodeURIComponent(req.query.q) : ""}`;

		const $ = await requestHTML(url);

		let tags = [];

		$("#tag-box ul li a.search-tag").each((i, el) => {
			tags.push([
				decodeURIComponent(
					$(el)
						.attr("href")
						.replace("/posts?tags=", "")
				),
				$(el)
					.next()
					.text()
					.endsWith("k")
					? parseInt(
							$(el)
								.next()
								.text()
								.replace("k", "") * 1000
					  )
					: parseInt(
							$(el)
								.next()
								.text()
					  ) || -1,
				parseInt(
					$(el.parent)
						.attr("class")
						.substr(-1)
				)
			]);
		});

		res.json({ tags: tags });
	}
};
