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
import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

function App() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [bugs, setBugs] = useState([]);
  const [bugComment, setBugComment] = useState("");
  store.subscribe(() => {
    setBugs(store.getState());
  });
  useEffect(() => {
    // console.clear();
    console.log(store.getState());
    console.log(store);
    setBugs(store.getState());

    // console.log(store.getState());
  }, []);
  const addBug = (desc) => {
    const doo = async () => {
      store.dispatch(bugAdded(desc));
      setBugs(store.getState());
    };
    const unsubscribe = store.subscribe(() => {
      setBugs(store.getState());
    });
    doo();
    unsubscribe();
  };
  const removeBug = (id) => {
    console.log(id);

    const doo = async () => {
      store.dispatch(bugRemoved(id));
      setBugs(store.getState());
    };
    const unsubscribe = store.subscribe(() => {
      setBugs(store.getState());
    });
    doo();
    unsubscribe();
  };
  const resolveBug = (id) => {
    console.log(id);
    const doo = async () => {
      store.dispatch(bugResolved(id));
      setBugs(store.getState());
    };
    const unsubscribe = store.subscribe(() => {
      setBugs(store.getState());
    });
    doo();
    unsubscribe();
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
            {store.getState().map((bug, index) => (
              <ListboxItem
                key={`key-${index}`}
                onDoubleClick={() => removeBug(bug.id)}
                onClick={() => resolveBug(bug.id)}
                textValue={`${index + 1}. ${bug.description}`}
                className={`${bug.resolved ? "bg-green-100" : "bg-red-100"}`}
              >
                {index + 1}. {bug.description}
              </ListboxItem>
            ))}
          </Listbox>
        </Card>
      </div>
    </>
  );
}

export default App;
