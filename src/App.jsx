import { useState, useEffect } from "react";
import "./App.css";
import store from "./store/store";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  getAllBugs /** not used - TODO: remove */,
} from "./store/reducer";
import * as apiActions from "./store/apiAction";

function App() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [bugs, setBugs] = useState(store.getState().bugs);
  const [bugComment, setBugComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  store.subscribe(() => {
    updateBugs();
  });
  const updateBugs = () => {
    // console.log("updated bugs is : ", store.getState().bugs);
    setLoading(store.getState().bugs.isloading);
    setBugs(store.getState().bugs);
  };
  useEffect(() => {
    const doo = async () => {
      console.log(apiActions.apiCallBegan);
      store.dispatch(
        apiActions.loadBugs()
      );
      window.store = store;
    };
    console.log(
      "how store looks before anything but initialization ",
      store.getState()
    );
    doo();
  }, []);
  const addBug = (description) => {
    const doo = async () => {
      store.dispatch(bugAdded({ description }));
    };
    doo();
  };
  const removeBug = (id) => {
    const doo = async () => {
      store.dispatch(bugRemoved({ id }));
    };
    doo();
  };
  const resolveBug = (id) => {
    const doo = async () => {
      store.dispatch(bugResolved({ id }));
    };
    doo();
  };

  return (
    <>
      <div className="container relative min-w-[100vw]  flex-col gap-2" data-theme="dark">
        {
          isLoading && <div className="overlay w-full h-full absolute top-0 left-0  z-10  flex items-center justify-center backdrop-filter text-white text-center flex-col bg-gray-300 bg-opacity-25">
            <span className="loading loading-dots loading-lg color white "></span>
            Loading...
          </div>
        }
        <div
          className="card bg-base-100  shadow-xl flex justify-center items-center flex-col border p-4 w-[400px]"

        >
          <div className="card-body flex w-full items-center justify-center md:flex-nowrap gap-4">
            <div className="field flex items-center justify-center gap-4">
              <input
                type="text"
                label="Bug"
                size="sm"
                value={bugComment}
                onChange={(e) => setBugComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && bugComment.length > 4) {
                    addBug(bugComment);
                    setBugComment("");
                  }
                }}
                className="input border-1"
                placeholder="Bug message..."
              />
              <button
                className="btn btn-outline btn-primary"
                type="text"
                label="Bug"
                size="sm"
                onClick={(e) => {
                  addBug(bugComment);
                }}
              >
                {isLoading ? <span className="loading loading-ring loading-xs"></span> : "Add"}
              </button>
            </div>
          </div>
          <ul className="menu bg-base-200 rounded-box w-full py-3  min-h-56 max-h-56 overflow-y-scroll">
            {bugs.list.map((bug, index) => (
              <li
                key={`key-${index}`}
                onDoubleClick={() => {
                  console.log("resolving : ", bug.id);
                  removeBug(bug.id)
                }}
                onClick={() => {
                  if (!bug.resolved) resolveBug(bug.id);
                }}
                className={`flex items-center justify-between flex-row  px-2`}
              >
                <span
                  className={`flex items-center justify-between flex-row  px-2 w-full`}
                >
                  <span className="max-w-[200px] truncate">
                    {index + 1}. {bug.description}
                  </span>
                  <span
                    className={`h-5 w-5 rounded-full ${bug.resolved ? "bg-blue-500" : "bg-red-400"
                      }`}
                  ></span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default App;