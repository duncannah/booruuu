const { requestJSON } = require("../../../request");

module.exports = {
	preferredMethod: "json",

	verif: (req) => {
		if (isNaN(parseInt(req.query.id, 10)) || parseInt(req.query.id, 10) <= 0) throw Error(`ID not valid`);
	},

	json: async (req, res, site) => {
		let url = `${site.url}/notes.json?group_by=note&search[post_id]=${parseInt(req.query.id, 10)}`;

		const json = await requestJSON(url);

		let notes = [];

		for (const note of json)
			notes.push({
				x: note.x,
				y: note.y,
				w: note.width,
				h: note.height,
				b: note.body
			});

		res.json({ notes: notes });
	}
};
