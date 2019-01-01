const fetch = require("node-fetch");
const fs = require("fs-extra");

const POST_LIMIT = 75;
const POST_LIMIT_TAXING = 30;

const IMG_FLASH = "flash";

let userAgent =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36";

module.exports = {
	fetchOpt: () => {
		return {
			headers: {
				"User-Agent": "booruuu/0.1 (duncannah/booruuu on GitHub)"
			}
		};
	},

	fetchOptScraping: () => {
		return {
			headers: {
				Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
				"User-Agent": userAgent,
				"Accept-Language": "en-US,en;q=1.0",
				"Cache-Control": "max-age=0"
			}
		};
	},

	POST_LIMIT,
	POST_LIMIT_TAXING,

	IMG_FLASH
};

const updateUserAgent = async () => {
	try {
		let stats;
		try {
			stats = await fs.stat(__dirname + "/useragent.txt");
		} catch (error) {
			stats = { mtime: 0 };
		}

		// if older than 24hrs
		if (new Date() - stats.mtime > 1000 * 60 * 60 * 24) {
			const req = await fetch("https://techblog.willshouse.com/2012/01/03/most-common-user-agents/");
			const txt = await req.text();
			const match = txt.match(/ly">(Mozilla.*?)\n/);

			if (match) {
				await fs.writeFile(__dirname + "/useragent.txt", match[1]);
				userAgent = match[1];
			}
		} else userAgent = (await fs.readFile(__dirname + "/useragent.txt")).toString().split("\n")[0];
	} catch (error) {
		console.error(error);
	}
};

updateUserAgent();
setInterval(updateUserAgent, 1000 * 60 * 60);
