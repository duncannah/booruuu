const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	html: async (req, res, site) => {
		let url = `${site.url}/index.php?page=post&s=list${
			req.query.hasOwnProperty("q") ? "&tags=" + encodeURIComponent(req.query.q) : ""
		}`;

		const $ = await requestHTML(url);

		let tags = [];

		$("#tag-list li[class^='tag-type-'] a:first-child").each((i, el) => {
			tags.push([
				decodeURIComponent(
					$(el)
						.attr("href")
						.substr(34)
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
