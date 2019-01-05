const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	verif: (req) => {
		if (isNaN(parseInt(req.query.id)) || parseInt(req.query.id) <= 0) throw Error(`ID not valid`);
	},

	html: async (req, res, site) => {
		let url = `${site.url}/index.php?page=post&s=view&id=${parseInt(req.query.id)}`;

		const $ = await requestHTML(url);

		let tags = [];

		$("#tag-sidebar li[class^='tag-type-'] a:first-child").each((_, el) =>
			tags.push([
				decodeURIComponent(
					$(el)
						.attr("href")
						.substr(32)
				),

				parseInt(
					$(el)
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
			])
		);

		let source = "";
		$("#stats li").each((_, el) => {
			if (
				$(el)
					.text()
					.startsWith("Source: ")
			)
				source = $(el)
					.text()
					.substr(8);
		});

		res.json({ info: { tags: tags, sources: [source] } });
	}
};
