const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	html: async (req, res, site) => {
		if (parseInt(req.query.id) === NaN || parseInt(req.query.id) <= 0) throw Error(`ID not valid`);

		let url = `${site.url}/index.php?page=post&s=view&id=${parseInt(req.query.id)}`;

		const $ = await requestHTML(url);

		let tags = [];

		$("#tag-sidebar li[class^='tag-type-'] a:first-child").each((i, el) => {
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
			]);
		});

		res.json({ tags: tags });
	}
};
