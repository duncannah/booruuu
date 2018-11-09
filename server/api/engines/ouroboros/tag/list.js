const { requestJSON } = require("../../../request");

module.exports = async (req, res, site) => {
	// TODO: tag types

	let url = `${site.url}/tag/index.json?limit=30`;

	if (req.query.q) url = `${site.url}/tag/related.json?tags=${encodeURIComponent(req.query.q)}`;

	const json = await requestJSON(url);

	let tags = [];

	if (req.query.q)
		for (const tag of json)
			tags.push([tag[0], tag[1], { general: 0, artist: 1, copyright: 3, character: 4, species: 5 }[tag[2]]]);
	else for (const tag of json) tags.push([tag.name, tag.count, tag.type]);

	res.json({ tags: tags });
};
