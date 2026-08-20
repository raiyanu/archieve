import { createAction } from "@reduxjs/toolkit";
import { bugRequested, bugRequestFailed } from "./reducer";
export const apiCallBegan = createAction("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");
export const apiBugsRecived = createAction("bugs/bugsRecived");

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().bugs;

  const diffInMinutes = (Date.now() - new Date(lastFetch).getTime()) / 6000;
  if (diffInMinutes < 10) {
    console.log(`${diffInMinutes} is the last before request made`);
    return;
  }
  dispatch(
    apiCallBegan({
      url: "/api/bugs",
      method: "post",
      onStart: bugRequested.type,
      onError: bugRequestFailed.type,
      onSuccess: apiBugsRecived.type,
    })
  );
};

// export const addBug = (bug) =>
//   apiCallBegan({
//     url: "/api/bugs",
//     method: "post",
//     data: bug,
//     onStart: bugRequested.type,
//     onError: bugRequestFailed.type,
//     onSuccess: apiBugsRecived.type,
//   });
// export const loadBugs = () =>
//   apiCallBegan({
//     url: "/api/bugs",
//     method: "get",
//     data: {},
//     onStart: bugRequested.type,
//     onError: bugRequestFailed.type,
//     onSuccess: apiBugsRecived.type,
//   });
