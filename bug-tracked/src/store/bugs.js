import { createAction, createReducer } from "@reduxjs/toolkit";

//  for implementing ducks pattern but i'll use the traditional way

// Action types
const ADDED_BUG = "addBug"; // supposed to be export
const REMOVED_BUG = "removeBug"; // supposed to be export
const RESOLVED_BUG = "resolvedBug"; // supposed to be export

// Action creators
export const bugAdded = createAction(ADDED_BUG);
export const bugRemoved = createAction(REMOVED_BUG);
export const bugResolved = createAction(RESOLVED_BUG);

// Reducer function
let lastId = 0;

const reducer1 = createReducer([], {
  [bugAdded.type]: (state, action) => {
    if (action.payload.description.length < 5) {
      return state;
    }
    state.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },
  [bugRemoved.type]: (state, action) => {
    return state.filter((bug) => bug.id !== action.payload.id);
  },
  [bugResolved.type]: (state, action) => {
    return state.map((bug) =>
      bug.id === action.payload.id ? { ...bug, resolved: true } : bug
    );
  },
});

const reducer = (state = [], action) => {
  switch (action.type) {
    case bugAdded.type:
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
    case bugRemoved.type:
      console.log(action.payload.id);
      return state.filter((bug) => bug.id !== action.payload.id);
    case bugResolved.type:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
};

export default reducer;

// After this modification, this is how it should look like:
//
// CODE : store.dispatch(bugAdded({ description: "Bug 1" }));
//
// but i'll use the traditional way
