const { requestJSON } = require("../../../request");

module.exports = {
	preferredMethod: "json",

	verif: (req) => {
		if (isNaN(parseInt(req.query.id)) || parseInt(req.query.id) <= 0) throw Error(`ID not valid`);
	},

	json: async (req, res, site) => {
		let url = `${site.url}/post/tags.json?id=${parseInt(req.query.id)}`;

		const json = await requestJSON(url);

		let tags = [];

		for (const tag of json) tags.push([tag.name, tag.count, tag.type]);

		res.json({ tags: tags });
	}
};
