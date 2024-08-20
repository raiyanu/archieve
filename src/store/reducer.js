import * as ActionTypes from "./actionTypes";
import { combineReducers, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
let lastId = 0;

const bugSlice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      if (action.payload.description.length < 5) {
        return bugs;
      }
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugRemoved: (bugs, action) => {
      return bugs.filter((bug) => bug.id !== action.payload.id);
    },
    bugResolved: (bugs, action) => {
      return bugs.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    },
  },
});

// export default slice.reducer;
// it supposed to be entities reducer store
const reducer = combineReducers({
  bugs: bugSlice.reducer,
  // beg: bugSlice.reducer,
});

export default reducer;
export const { bugAdded, bugRemoved, bugResolved } = bugSlice.actions;

export const getAllBugs = (store) =>
  createSelector(
    (state) => store.bugs,
    (bugs) => store.bugs
  );
