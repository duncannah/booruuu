const { requestJSON } = require("../../../request");

module.exports = {
	preferredMethod: "json",

	verif: (req) => {
		if (isNaN(parseInt(req.query.id, 10)) || parseInt(req.query.id, 10) <= 0) throw Error(`ID not valid`);
	},

	json: async (req, res, site) => {
		let url = `${site.url}/post/tags.json?id=${parseInt(req.query.id, 10)}`;

		const json = await requestJSON(url);

		let tags = [];

		for (const tag of json) tags.push([tag.name, tag.count, tag.type]);

		res.json({ tags: tags });
	}
};
