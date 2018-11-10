module.exports = {
	safebooru: {
		name: "safebooru.org",
		url: "https://safebooru.org",

		nsfw: false,

		engine: "gelbooru_old",

		tagTypes: {
			copyright: { color: "rgba(238, 133, 255, .6)", id: 3 },
			artist: { color: "rgba(255, 133, 133, .6)", id: 1 },
			character: { color: "rgba(143, 255, 133, .6)", id: 4 },
			general: { color: "", id: 0 },
			metadata: { color: "rgba(255, 252, 133, .6)", id: 5 }
		}
	},

	e926: {
		name: "e926.net",
		url: "https://e926.net",

		nsfw: false,

		engine: "ouroboros",

		tagTypes: {
			artist: { color: "rgba(255, 252, 133, .6)", id: 1 },
			character: { color: "rgba(143, 255, 133, .6)", id: 4 },
			copyright: { color: "rgba(238, 133, 255, .6)", id: 3 },
			species: { color: "rgba(255, 160, 133, .6)", id: 5 },
			general: { color: "", id: 0 }
		}
	},

	e621: {
		name: "e621.net",
		url: "https://e621.net",

		nsfw: true,

		engine: "ouroboros",

		tagTypes: {
			artist: { color: "rgba(255, 252, 133, .6)", id: 1 },
			character: { color: "rgba(143, 255, 133, .6)", id: 4 },
			copyright: { color: "rgba(238, 133, 255, .6)", id: 3 },
			species: { color: "rgba(255, 160, 133, .6)", id: 5 },
			general: { color: "", id: 0 }
		}
	},

	danbooru: {
		name: "danbooru.donmai.us",
		url: "https://danbooru.donmai.us",

		nsfw: true,

		engine: "danbooru",

		tagTypes: {
			copyright: { color: "rgba(238, 133, 255, .6)", id: 3 },
			artist: { color: "rgba(255, 133, 133, .6)", id: 1 },
			character: { color: "rgba(143, 255, 133, .6)", id: 4 },
			general: { color: "", id: 0 },
			meta: { color: "rgba(255, 252, 133, .6)", id: 5 }
		}
	},

	gelbooru: {
		name: "gelbooru.com",
		url: "https://gelbooru.com",

		nsfw: true,

		engine: "gelbooru_new",

		tagTypes: {
			copyright: { color: "rgba(238, 133, 255, .6)", id: 3 },
			artist: { color: "rgba(255, 133, 133, .6)", id: 1 },
			character: { color: "rgba(143, 255, 133, .6)", id: 4 },
			general: { color: "", id: 0 },
			metadata: { color: "rgba(255, 252, 133, .6)", id: 5 }
		}
	},

	sankaku_chan: {
		name: "chan.sankakucomplex.com",
		url: "https://chan.sankakucomplex.com",

		nsfw: true,

		engine: "sankaku",

		tagTypes: {
			copyright: { color: "rgba(160, 84, 160, .6)", id: 3 },
			studio: { color: "rgba(255, 133, 226, .6)", id: 2 },
			character: { color: "rgba(133, 255, 133, .6)", id: 4 },
			artist: { color: "rgba(255, 133, 133, .6)", id: 1 },
			medium: { color: "rgba(133, 210, 255, .6)", id: 8 },
			general: { color: "", id: 0 },
			meta: { color: "rgba(177, 133, 255, .6)", id: 9 }
		}
	}
};
