const { requestHTML } = require("../../../request");

module.exports = {
	preferredMethod: "html",

	html: async (req, res, site) => {
		let url = `${site.url}/tag/index?order=count`;

		if (req.query.q) url = `${site.url}/?tags=${encodeURIComponent(req.query.q)}&commit=Search`;

		const $ = await requestHTML(url);

		let tags = [];

		if (req.query.q)
			$("#tag-sidebar li a[itemprop=keywords]").each((i, el) => {
				tags.push([
					decodeURIComponent(
						$(el)
							.attr("href")
							.replace("/?tags=", "")
					),

					parseInt(
						$(el)
							.next()
							.children()
							.last()
							.text(),
						10
					),

					(
						site.tagTypes[
							$(el.parent)
								.attr("class")
								.substr(9)
						] || { id: -1 }
					).id
				]);
			});
		else
			$(".highlightable tbody tr").each((i, el) => {
				tags.push([
					decodeURIComponent(
						$(el)
							.children()
							.first()
							.next()
							.children()
							.last()
							.attr("href")
							.replace("/?tags=", "")
					),

					parseInt(
						$(el)
							.children()
							.first()
							.text(),
						10
					),

					(
						site.tagTypes[
							$(el)
								.children()
								.first()
								.next()
								.attr("class")
								.substr(9)
						] || { id: -1 }
					).id
				]);
			});

		res.json({ tags: tags });
	}
};
