import { appActions } from "./actions";

const initialState = {
	notifications: {},
	settings: {
		color:
			parseInt(localStorage.getItem("settings.color"), 10) >= 1 &&
			parseInt(localStorage.getItem("settings.color"), 10) <= 4
				? parseInt(localStorage.getItem("settings.color"), 10)
				: 1,
		defaultVolume:
			parseFloat(localStorage.getItem("settings.defaultVolume")) <= 1 &&
			parseFloat(localStorage.getItem("settings.defaultVolume")) >= 0
				? parseFloat(localStorage.getItem("settings.defaultVolume"))
				: 0.2,
		welcomeScreen: !isNaN(parseInt(localStorage.getItem("settings.welcomeScreen"), 10))
			? parseInt(localStorage.getItem("settings.welcomeScreen"), 10)
			: 1
	},

	loading: []
};

export function appReducer(state = initialState, action) {
	let toReturn;

	switch (action.type) {
		case appActions.NOTIFY:
			return {
				...state,
				notifications: { ...state.notifications, ...{ [new Date().getTime()]: { ...action.payload } } }
			};

		case appActions.DISMISS_NOTIF:
			toReturn = { ...state, notifications: {} };
			Object.keys(state.notifications).forEach((index) => {
				if (index !== action.payload) toReturn.notifications[index] = state.notifications[index];
			});

			return toReturn;

		case appActions.SET_SETTINGS:
			return {
				...state,
				settings: {
					...state.settings,
					...action.payload
				}
			};

		case appActions.LOADING:
			toReturn = { ...state, loading: [] };
			if (action.payload.start) toReturn.loading = [...state.loading, action.payload.action];
			else
				state.loading.forEach((act) => {
					if (act !== action.payload.action) toReturn.loading.push(act);
				});

			return toReturn;

		default:
			return state;
	}
}
