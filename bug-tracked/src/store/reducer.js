import * as ActionTypes from "./actionTypes";
import { combineReducers, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as apiAction from "./apiAction";
let lastId = 2;

const bugSlice = createSlice({
  name: "bugs",
  initialState: {
    list: [
      // {
      //   id: 1,
      //   description: "default here",
      //   resolved: false,
      // },
      // {
      //   id: 2,
      //   description: "default here 2",
      //   resolved: true,
      // },
    ],
    isloading: false,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      if (action.payload.description.length < 5) {
        return bugs;
      }
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugRemoved: (bugs, action) => {
      bugs.list = bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
    bugResolved: (bugs, action) => {
      bugs.list = bugs.list.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    },
    bugsRecived: (bugs, action) => {
      console.log("pushing bug in bugs");
      action.payload.forEach((bug) => {
        bugs.list.push(bug);
      });
      bugs.isloading = false;
      bugs.lastFetch = Date.now();
    },
    bugRequested: (bugs, action) => {
      bugs.isloading = true;
    },
    bugRequestFailed: (bugs, action) => {
      bugs.isloading = false;
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

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugsRecived,
  bugRequested,
  bugRequestFailed,
} = bugSlice.actions;

export const getAllBugs = (store) =>
  createSelector(
    (state) => store.bugs,
    (bugs) => store.bugs
  );
