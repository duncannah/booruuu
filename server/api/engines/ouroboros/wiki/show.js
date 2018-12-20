const { requestJSON } = require("../../../request");

module.exports = {
	preferredMethod: "json",

	verif: (req) => {
		if (!req.query.title) throw Error("Required parameter missing");
	},

	json: async (req, res, site) => {
		let url = `${site.url}/wiki/show.json?title=${encodeURIComponent(req.query.title)}`;

		try {
			const json = await requestJSON(url);

			res.json({ description: json.body });
		} catch (error) {
			if (error.message === "Booru returned 404") res.json({ description: "" });
			else throw error;
		}
	}
};
