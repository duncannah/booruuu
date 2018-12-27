const fetch = require("node-fetch");
const cheerio = require("cheerio");

const { fetchOpt, fetchOptScraping, POST_LIMIT, POST_LIMIT_TAXING } = require("./constants");

module.exports = {
	request: async (url, scraping = false) => {
		const booru = await fetch(
			url.replace("%LT", POST_LIMIT_TAXING).replace("%L", POST_LIMIT),
			scraping ? fetchOptScraping() : fetchOpt()
		);
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

		if (json.hasOwnProperty("success") && !json.success) throw Error(`Booru returned: "${booru.reason}"`);

		return json;
	},

	requestHTML: async (url, scraping = true) => {
		const booru = await module.exports.request(url, scraping);
		const html = await booru.text();

		return await cheerio.load(html);
	},

	decodeHTML: (str) => str.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
};
