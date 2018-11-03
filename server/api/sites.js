module.exports = {
	e926: {
		name: "e926.net",
		url: "https://e926.net",

		nsfw: false,

		engine: "ouroboros",

		tagTypes: {
			artist: { color: "rgba(255, 252, 133, .6)", id: 1, order: 0 },
			character: { color: "rgba(143, 255, 133, .6)", id: 4, order: 1 },
			copyright: { color: "rgba(191, 133, 255, .6)", id: 3, order: 2 },
			species: { color: "rgba(255, 160, 133, .6)", id: 5, order: 3 },
			general: { color: "", id: 0, order: 4 }
		}
	},

	e621: {
		name: "e621.net",
		url: "https://e621.net",

		nsfw: true,

		engine: "ouroboros",

		tagTypes: {
			artist: { color: "rgba(255, 252, 133, .6)", id: 1, order: 0 },
			character: { color: "rgba(143, 255, 133, .6)", id: 4, order: 1 },
			copyright: { color: "rgba(191, 133, 255, .6)", id: 3, order: 2 },
			species: { color: "rgba(255, 160, 133, .6)", id: 5, order: 3 },
			general: { color: "", id: 0, order: 4 }
		}
	},

	danbooru: {
		name: "danbooru.donmai.us",
		url: "https://danbooru.donmai.us",

		nsfw: true,

		engine: "danbooru"
	},

	sankaku_chan: {
		name: "chan.sankakucomplex.com",
		url: "https://chan.sankakucomplex.com",

		nsfw: true,

		engine: "sankaku"
	}
};
