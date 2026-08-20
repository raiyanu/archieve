import axios from "axios";
import * as apiActions from "../apiAction";

const api = (store) => (next) => async (action) => {
  // console.log("making work with API CALL  action: ", action);
  if (action.type !== apiActions.apiCallBegan.type) return next(action);
  const { url, method, data, onSuccess, onError, onStart } = action.payload;
  if (onStart) store.dispatch({ type: onStart });
  next(action);
  try {
    console.log("apiCallBegin  making api call: ", action.payload);
    const response = await axios.request({
      baseURL: "http://localhost:9001",
      url,
      method,
      data,
    });
    console.log("apiCallBegin  response: ", response);
    // General handler for onSuccess
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
    store.dispatch({
      type: apiActions.apiCallSuccess.type,
      payload: response.data,
    });
  } catch (error) {
    console.trace("apiCallBegin  error: ", error);
    // General handler for onError
    store.dispatch({
      type: apiActions.apiCallFailed.type,
      payload: error.message,
    });

    // custom handler for onError
    if (onError) store.dispatch({ type: onError, payload: error.message });
  }
};

export default api;
