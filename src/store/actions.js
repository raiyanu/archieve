import { createAction, createReducer } from "@reduxjs/toolkit";
import * as actionTypes from "./actionTypes";

export const bugAdded = createAction(actionTypes.ADDED_BUG);
export const bugRemoved = createAction(actionTypes.REMOVED_BUG);
export const bugResolved = createAction(actionTypes.RESOLVED_BUG);
