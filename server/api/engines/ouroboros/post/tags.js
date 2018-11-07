const { requestJSON } = require("../../../request");

module.exports = async (req, res, site) => {
	if (parseInt(req.query.id) === NaN || parseInt(req.query.id) <= 0) throw Error(`ID not valid`);

	let url = `${site.url}/post/tags.json?id=${parseInt(req.query.id)}`;

	const json = await requestJSON(url);

	let tags = [];

	for (const tag of json) tags.push([tag.name, tag.count, tag.type]);

	res.json({ tags: tags });
};
