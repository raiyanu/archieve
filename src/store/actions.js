import * as ActionTypes from "./actionTypes";

export const bugAdded = (desc) => ({
  type: ActionTypes.ADDED_BUG,
  payload: {
    description: desc,
  },
});
export const bugRemoved = (id) => ({
  type: ActionTypes.REMOVED_BUG,
  payload: {
    id: id,
  },
});

export const bugResolved = (id) => ({
  type: ActionTypes.RESOLVED_BUG,
  payload: {
    id: id,
  },
});
