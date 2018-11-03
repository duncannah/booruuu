import { appActions } from "./actions";

const initialState = {
	notifications: {},
	settings: { color: 1 },

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
