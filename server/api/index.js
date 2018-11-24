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
		const action = engines[sites[req.params.site].engine][req.params.controller][req.params.action];
		if (!action.hasOwnProperty("sites")) action.sites = {};

		if (!action.sites.hasOwnProperty(req.params.site)) action.sites[req.params.site] = action.preferredMethod;

		setTimeout(() => {
			action.sites[req.params.site] = action.preferredMethod;
		}, 1000 * 60 * 10);

		if (action.hasOwnProperty("verif")) action.verif(req);

		try {
			await action[action.sites[req.params.site]](req, res, sites[req.params.site]);
		} catch (error) {
			if (!action.hasOwnProperty("json") || !action.hasOwnProperty("html")) throw error;

			if (action.sites[req.params.site] !== action.preferredMethod)
				action.sites[req.params.site] = action.preferredMethod;
			else action.sites[req.params.site] = action.preferredMethod === "json" ? "html" : "json";

			await action[action.sites[req.params.site]](req, res, sites[req.params.site]);
		}

		if (!res.headersSent) throw Error("No response from handler");
	} catch (error) {
		console.error(error, req.params, req.query);
		return res.json({ error: true, errorMessage: error ? error.message : `Unknown error` });
	}
});

module.exports = router;
