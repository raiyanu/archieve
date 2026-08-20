const preFuncActions = (store) => (next) => (action) => {
  console.log("preFuncActions: ", action.type);
  if (typeof action === "function") {
    action();
  } else {
    console.log("Calling api action now", action.type);
    next(action);
  }
};

export default preFuncActions;
