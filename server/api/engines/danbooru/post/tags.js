const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	html: async (req, res, site) => {
		if (parseInt(req.query.id) === NaN || parseInt(req.query.id) <= 0) throw Error(`ID not valid`);

		let url = `${site.url}/posts/${parseInt(req.query.id)}`;

		const $ = await requestHTML(url);

		let tags = [];

		$("#tag-list ul li a.search-tag").each((i, el) => {
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
