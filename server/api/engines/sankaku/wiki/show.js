const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	verif: (req) => {
		if (!req.query.title) throw Error("Required parameter missing");
	},

	html: async (req, res, site) => {
		let url = `${site.url}/wiki/show?title=${encodeURIComponent(req.query.title)}`;

		const $ = await requestHTML(url);

		$("a").each((_, e) => {
			if (
				$(e)
					.attr("href")
					.startsWith("/wiki/show?title=")
			)
				$(e).attr(
					"href",
					"/wiki/show/" +
						$(e)
							.attr("href")
							.substr(17)
				);
		});

		res.json({ description: $(".wiki-body").html() });
	}
};
