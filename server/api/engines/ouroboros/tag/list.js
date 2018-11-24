const { requestJSON, requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "json",

	json: async (req, res, site) => {
		let url = `${site.url}/tag/index.json?limit=30`;

		if (req.query.q) url = `${site.url}/tag/related.json?tags=${encodeURIComponent(req.query.q)}`;

		const json = await requestJSON(url);

		let tags = [];

		if (req.query.q)
			for (const tag of json)
				tags.push([tag[0], tag[1], { general: 0, artist: 1, copyright: 3, character: 4, species: 5 }[tag[2]]]);
		else for (const tag of json) tags.push([tag.name, tag.count, tag.type]);

		res.json({ tags: tags });
	},

	html: async (req, res, site) => {
		let url = `${site.url}/post/index/1/${encodeURIComponent(req.query.q || "")}`;

		const $ = await requestHTML(url);

		let tags = [];

		$("#tag-sidebar li a:first-child").each((i, el) => {
			tags.push([
				decodeURIComponent(
					$(el)
						.attr("href")
						.substr(
							$(el)
								.attr("href")
								.indexOf("=") + 1
						)
				),

				parseInt(
					$(el)
						.next()
						.next()
						.next()
						.next()
						.text()
				) || -1,

				(
					site.tagTypes[
						$(el.parent)
							.attr("class")
							.substr(9)
					] || { id: -1 }
				).id
			]);
		});

		res.json({ tags: tags });
	}
};
