const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	verif: (req) => {
		if (!req.query.title) throw Error("Required parameter missing");
	},

	html: async (req, res, site) => {
		let url = `${site.url}/wiki/show?title=${encodeURIComponent(req.query.title)}`;

		const $ = await requestHTML(url);

		$(".section, .thumb_dtext").remove();

		res.json({
			description: $("#wiki-body")
				.children()
				.first()
				.html()
		});
	}
};
