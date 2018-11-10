const express = require("express");
const router = express.Router();

const sites = require("./sites");
const engines = require("./engines");

router.get("/sites", (req, res) => {
	res.json({ sites: sites });
});

router.get("/sites/:site/:controller/:action", async (req, res) => {
	if (!sites.hasOwnProperty(req.params.site)) return res.json({ error: true, errorMessage: "Unknown site" });

	if (!engines[sites[req.params.site].engine].hasOwnProperty(req.params.controller))
		return res.json({ error: true, errorMessage: "Unknown controller" });

	if (!engines[sites[req.params.site].engine][req.params.controller].hasOwnProperty(req.params.action))
		return res.json({ error: true, errorMessage: "Unknown action" });

	try {
		await engines[sites[req.params.site].engine][req.params.controller][req.params.action](
			req,
			res,
			sites[req.params.site]
		);

		if (!res.headersSent) throw Error("No response from handler");
	} catch (error) {
		console.error(error, req.params, req.query);
		return res.json({ error: true, errorMessage: error ? error.message : `Unknown error` });
	}
});

module.exports = router;
