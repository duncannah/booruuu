const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	verif: (req) => {
		if (isNaN(parseInt(req.query.id, 10)) || parseInt(req.query.id, 10) <= 0) throw Error(`ID not valid`);
	},

	html: async (req, res, site) => {
		let url = `${site.url}/posts/${parseInt(req.query.id, 10)}`;

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
								.replace("k", "") * 1000,
							10
					  )
					: parseInt(
							$(el)
								.next()
								.text(),
							10
					  ) || -1,
				parseInt(
					$(el.parent)
						.attr("class")
						.substr(-1),
					10
				)
			]);
		});

		res.json({ tags: tags });
	}
};
