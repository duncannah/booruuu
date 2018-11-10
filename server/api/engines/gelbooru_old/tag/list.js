const { requestHTML } = require("../../../request");

module.exports = async (req, res, site) => {
	let url = `${site.url}/index.php?page=post&s=list${
		req.query.hasOwnProperty("q") ? "&tags=" + encodeURIComponent(req.query.q) : ""
	}`;

	const $ = await requestHTML(url);

	let tags = [];

	$("#tag-sidebar li[class^='tag-type-'] a:first-child").each((i, el) => {
		tags.push([
			decodeURIComponent(
				$(el)
					.next()
					.next()
					.attr("href")
					.substr(32)
			),

			parseInt(
				$(el)
					.siblings()
					.last()
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
};
