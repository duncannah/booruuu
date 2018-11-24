const { requestJSON } = require("../../../request");

module.exports = {
	preferredMethod: "json",

	json: async (req, res, site) => {
		if (parseInt(req.query.id) === NaN || parseInt(req.query.id) <= 0) throw Error(`ID not valid`);

		let url = `${site.url}/note/index.json?post_id=${parseInt(req.query.id)}`;

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
