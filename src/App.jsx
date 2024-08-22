import { useState, useEffect } from "react";
import "./App.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
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
  const [bugs, setBugs] = useState([]);
  const [bugComment, setBugComment] = useState("");
  store.subscribe(() => {
    updateBugs();
  });
  const updateBugs = () => {
    setBugs(store.getState().bugs);
  };
  useEffect(() => {
    const doo = async () => {
      store.dispatch(
        apiActions.apiCallBegan({
          url: "/api/bugs",
          method: "get",
          data: {},
          onSucces:"api/CallSuccess"
        })
      );
    };
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
      <div className="flex justify-center items-center h-screen flex-col">
        {/* <h1 className="text-3xl font-bold underline text-center">Hello</h1> */}
        <Card width="500px" className="border p-4">
          <div className="flex w-full items-center md:flex-nowrap gap-4">
            <Input
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
            />{" "}
            <Button
              color="primary"
              size="md"
              onClick={() => addBug(bugComment)}
            >
              Add
            </Button>
          </div>
          <Listbox
            aria-label="Actions"
            className="py-3 min-h-56 max-h-56 overflow-y-scroll"
          >
            {bugs.map((bug, index) => (
              <ListboxItem
                key={`key-${index}`}
                onDoubleClick={() => removeBug(bug.id)}
                onClick={() => {
                  if (!bug.resolved) resolveBug(bug.id);
                }}
                textValue={`${index + 1}. ${bug.description}`}
                className={`*:flex *:items-center *:justify-between`}
              >
                <span>
                  {index + 1}. {bug.description}
                </span>
                <span
                  className={` h-5 w-5 inline-block rounded-full ${
                    bug.resolved ? "bg-green-400" : "bg-red-200"
                  }`}
                >
                  {" "}
                </span>
              </ListboxItem>
            ))}
          </Listbox>
        </Card>
      </div>
    </>
  );
}

export default App;
