import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@nextui-org/react";
import Navbar from "./components/Navbar";
import ContactList from "./components/ui/ContactList";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import Conversation from "./components/Conversation";
import { Spinner } from "@nextui-org/react";
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6969/api");
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setData("Unable to fetch data");
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="min-h-screen dark text-foreground bg-background">
        <Navbar />
        <div className="hidden">
          {loading ? <Spinner /> : <pre> message : {data.message}</pre>}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactList />} />
          <Route path="/conversation" element={<Conversation />} />
        </Routes>
      </div>
    </>
  );
}
export default App;

{
  /* <h1 className=''> count : {count}</h1> */
}
{
  /* <br /> */
}
{
  /* <Button onClick={() => { add() }} className='bg-primary text-primary-foreground ' variant='ghost'>Click me</Button> */
}
// const [count, setCount] = useState(0);
// const add = () => {
//   setCount(count + 1);
// }
