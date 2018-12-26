const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	verif: (req) => {
		if (!req.query.title) throw Error("Required parameter missing");
	},

	html: async (req, res, site) => {
		let url = `${site.url}/wiki/show.json?title=${encodeURIComponent(req.query.title)}`;

		const $ = await requestHTML(url);

		$(".wiki-other-name, .hint").remove();

		$("a").each((_, e) => {
			if (
				$(e)
					.attr("href")
					.startsWith("/wiki_pages/show_or_new?title=")
			)
				$(e).attr(
					"href",
					"/wiki/show/" +
						$(e)
							.attr("href")
							.substr(30)
				);
		});

		res.json({ description: $("#wiki-page-body").html() });
	}
};
