import { createAction } from "@reduxjs/toolkit";
import { bugRequested } from "./reducer";
export const apiCallBegan = createAction("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");
export const apiBugsRecived = createAction("bugs/bugsRecived");
export const loadBugs = () =>
  apiCallBegan({
    url: "/api/bugs",
    method: "get",
    data: {},
    onStart: bugRequested.type,
    onError: "Error",
    onSuccess: apiBugsRecived.type,
  });
