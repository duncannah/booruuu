import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware();
	let middleware = applyMiddleware(sagaMiddleware);

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(reducers, composeEnhancers(middleware));
	sagaMiddleware.run(sagas);

	return store;
}
