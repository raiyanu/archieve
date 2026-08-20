import { useEffect, useState } from "react";
import "./App.css";
import createStore from "./createStore";
import reducer from "./reducer";
import * as actions from "./actions";

function App() {
  useEffect(() => {
    async function doo() {
      console.log("Hello there");
      const store = createStore(reducer);
      store.subscribe(() => {
        console.log(store);
        console.log(store.getState());
      });
      store.dispatch(actions.bugAdded("very first bug"));
    }
    doo();
  }, []);
  return (
    <>
      <h1>Hello there</h1>
    </>
  );
}

export default App;
