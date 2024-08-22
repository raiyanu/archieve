import axios from "axios";
import * as apiActions from "../apiAction";

const api = (store) => (next) => async (action) => {
	console.log("making work with API CALL  action: ", action);
	if (action.type !== apiActions.apiCallBegan.type) return next(action);
	next(action);
	const { url, method, data, onSuccess, onError } = action.payload;
	try {
		console.log("apiCallBegin  making api call: ", action.payload);

		const response = await axios.request({
			baseURL: "http://localhost:9001",
			url,
			method,
			data,
		});
		store.dispatch({ type: onSuccess, payload: response.data });
	} catch (error) {
		console.trace("apiCallBegin  error: ", error);
		store.dispatch({ type: onError, payload: error });
	}
};

export default api;
