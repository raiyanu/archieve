import { bugAdded } from "../reducer";
import store from "../store";

describe("bugsSlice", () => {
  it("shouldn't add the bug with desc.length < 5 to the store if it's saved to the server", async () => {
    const bug = { description: "a" };
    const action = bugAdded(bug);
    //   console.log("action is ", action);
    store.dispatch(action);
    //   console.log("result is ", store.getState());
    const result = store.getState().bugs.list;
    expect(result).toEqual([]);
  });
  it("should add the bug to the store if it's saved to the server", async () => {
    const bug = { description: "abracaDabra" };
    const action = bugAdded(bug);
    // console.log("action is ", action);
    store.dispatch(action);
    // console.log("store is ", store.getState());
    const result = store.getState().bugs.list[0].description;
    // console.log("result is ", result);
    const expects = bug.description;
    // console.log("expect is ", expects);
    expect(result).toEqual(expects);
  });
});

// Test the action creators
// describe("bugsSlice", () => {
//   describe("action creators", () => {
//     it("bugAdded", () => {
//       const bug = { description: "a", method: "get" };
//       const result = bugAdded(bug);
//       const expected = {
//         type: bugAdded.type,
//         payload: bug,
//       };
//       expect(result).toEqual(expected);
//     });
//   });
// });
