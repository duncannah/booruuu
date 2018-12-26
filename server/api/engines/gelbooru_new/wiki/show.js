const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	verif: (req) => {
		if (!req.query.title) throw Error("Required parameter missing");
	},

	html: async (req, res, site) => {
		const $getID = await requestHTML(
			`${site.url}/index.php?page=wiki&s=list&search=${encodeURIComponent(req.query.title)}`
		);

		let id = -1;
		$getID(".highlightable td:nth-child(2) > a").each((_, e) => {
			if (
				$getID(e)
					.text()
					.toLowerCase() === req.query.title.toLowerCase()
			) {
				id = parseInt(
					$getID(e)
						.attr("href")
						.substr(30)
				);
				return false;
			}
		});

		if (!(id >= 0)) return res.json({ description: "" });

		const $ = await requestHTML(`${site.url}/index.php?page=wiki&s=view&id=${id}`);

		$("a").each((_, e) => {
			if (
				$(e)
					.attr("href")
					.startsWith("index.php?page=wiki&s=list&search=")
			)
				$(e).attr(
					"href",
					"/wiki/show/" +
						$(e)
							.attr("href")
							.substr(34)
				);
		});

		res.json({
			description: (
				($("#content table td")
					.first()
					.html()
					.match(/<br><br>(.*?)<br><br><br><br>\n\t<b>Other/s) || [])[1] || ""
			).trim()
		});
	}
};
