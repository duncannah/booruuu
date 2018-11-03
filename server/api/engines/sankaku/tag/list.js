const { requestHTML } = require("../../../request");

module.exports = async (req, res, site) => {
	// TODO: tag types

	// API either too unstable or they disabled it again
	// so we're HTML scraping
	let url = `${site.url}/tag/index?order=count`;

	if (req.query.q) url = `${site.url}/?tags=${encodeURIComponent(req.query.q)}`;

	const $ = await requestHTML(url);

	let tags = [];

	if (req.query.q)
		$("#tag-sidebar li a[itemprop=keywords]").each((i, el) => {
			tags.push({
				name: decodeURIComponent(
					$(el)
						.attr("href")
						.replace("/?tags=", "")
				),
				count: parseInt(
					$(el)
						.next()
						.children()
						.last()
						.text()
				)
			});
		});
	else
		$(".highlightable tbody tr").each((i, el) => {
			tags.push({
				name: decodeURIComponent(
					$(el)
						.children()
						.first()
						.next()
						.children()
						.last()
						.attr("href")
						.replace("/?tags=", "")
				),
				count: parseInt(
					$(el)
						.children()
						.first()
						.text()
				)
			});
		});

	res.json({ tags: tags });
};
