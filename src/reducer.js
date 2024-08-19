import * as ActionTypes from "./actionTypes";
let lastId = 0;
const reducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADDED_BUG:
      if (action.payload.description.length < 5) {
        return state;
      }
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case ActionTypes.REMOVED_BUG:
      console.log(action.payload.id);
      return state.filter((bug) => bug.id !== action.payload.id);
    case ActionTypes.RESOLVED_BUG:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
};

export default reducer;
