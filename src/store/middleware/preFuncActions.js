const preFuncActions = (store) => (next) => (action) => {
  if (typeof action === "function") {
    action();
  } else next(action);
  console.log("preFuncActions: ", action.type);
};

export default preFuncActions;
