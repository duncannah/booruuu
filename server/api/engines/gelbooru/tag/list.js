const { requestHTML } = require("../../../request");

module.exports = async (req, res, site) => {
	let url = `${site.url}/index.php?page=post&s=list${
		req.query.hasOwnProperty("q") ? "&tags=" + encodeURIComponent(req.query.q) : ""
	}`;

	const $ = await requestHTML(url);

	let tags = [];

	$("#tag-list li[class^='tag-type-'] a:first-child").each((i, el) => {
		tags.push({
			name: decodeURIComponent(
				$(el)
					.attr("href")
					.substr(34)
			),

			count:
				parseInt(
					$(el)
						.next()
						.next()
						.next()
						.next()
						.text()
				) || -1,

			type: (
				site.tagTypes[
					$(el.parent)
						.attr("class")
						.substr(9)
				] || { id: -1 }
			).id
		});
	});

	res.json({ tags: tags });
};
