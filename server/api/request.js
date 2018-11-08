const fetch = require("node-fetch");
const cheerio = require("cheerio");

const { fetchOpt, fetchOptScraping } = require("./constants");

module.exports = {
	request: async (url, scraping = false) => {
		const booru = await fetch(url, scraping ? fetchOptScraping() : fetchOpt());
		if (!booru.ok) throw Error(`Booru returned ${booru.status}`);

		return booru;
	},

	requestJSON: async (url, scraping = false) => {
		const booru = await module.exports.request(url, scraping);
		let json;

		try {
			json = await booru.json();
		} catch (e) {
			return [];
		}

		if (json.hasOwnProperty("success") && !json.success) throw Error(`Booru said: "${booru.reason}"`);

		return json;
	},

	requestHTML: async (url, scraping = true) => {
		const booru = await module.exports.request(url, scraping);
		const html = await booru.text();

		return await cheerio.load(html);
	}
};
