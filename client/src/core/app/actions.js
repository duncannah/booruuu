export const appActions = {
	INIT_APP: "INIT_APP",

	NOTIFY: "NOTIFY",
	DISMISS_NOTIF: "DISMISS_NOTIF",

	SET_SETTINGS: "SET_SETTINGS",

	LOADING: "LOADING",

	INIT_FAILED: "INIT_FAILED",

	initApp: () => ({
		type: appActions.INIT_APP
	}),

	notify: (message, error = null) => ({
		type: appActions.NOTIFY,
		payload: {
			message,
			error
		}
	}),

	dismissNotif: (i) => ({
		type: appActions.DISMISS_NOTIF,
		payload: i
	}),

	setSettings: (s) => ({
		type: appActions.SET_SETTINGS,
		payload: s
	}),

	loading: (action, start) => ({
		type: appActions.LOADING,
		payload: {
			action,
			start
		}
	}),

	initFailed: (err) => ({
		type: appActions.INIT_FAILED,
		payload: err
	})
};
