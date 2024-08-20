import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./bugs";
import reducer from "./reducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = configureStore({ reducer });

export default store;
