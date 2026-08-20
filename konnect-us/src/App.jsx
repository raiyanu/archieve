import { useState } from "react";
import Register from "./page/Register.jsx";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);
  //  axios.defaults.baseURL = import.meta.env.SERVER_URL;
  axios.defaults.baseURL = "http://localhost:6969/api";
  // console.log(import.meta.env.SERVER_URL);
  axios.defaults.withCredentials = true;
  // 638889 9DBC98 EBD9B4 F9EFDB
  return (
    <div className="w-screen h-screen bg-[#EBD9B4]">
      <h1 className=" text-center ">hey there</h1>
      <Register />
    </div>
  );
}

export default App;
