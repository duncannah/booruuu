import { combineReducers } from 'redux';

import { appReducer } from './app';
import { siteReducer } from './site';
import { postReducer } from './post';

export default combineReducers({
	app: appReducer,
	site: siteReducer,
	post: postReducer,
});