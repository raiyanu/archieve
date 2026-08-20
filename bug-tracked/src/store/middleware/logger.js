const logger = (params) => (store) => (next) => async (action) => {
  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
  let result = next(action);
  console.log("Action: ", action.type);
  console.log("Action-Payload: ", action.payload);
  return result;
};

export default logger;
