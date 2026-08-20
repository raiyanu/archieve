import {useContext} from "react";
import {ThemeContext} from "./ThemeContext";

function card() {

  const {darkTheme, toggleTheme} = useContext(ThemeContext);
  return (
    <>
    <div className={`rounded-lg shadow-lg p-4 w-[300px] h-[420px] m-auto mt-12 border flex items-center flex-col justify-center gap-2 ${darkTheme? "bg-black" : "bg-white"}`}>
      <div className={`flex items-center flex-col justify-center gap-3 ${darkTheme? "text-white" : "text-black"}`}>
        <div className={`h-16 w-16 rounded-full ${darkTheme? "bg-white" : "bg-black"}`}></div>
        <div className="ml-4">
          <h1 className={`text-xl font-bold ${darkTheme? "text-white" : "text-black"}`}>Raiyan Ahmed</h1>
          <span className={`text-gray-500 ${darkTheme? "text-white" : "text-black"}`}>Frontend Developer</span>
        </div>
      </div>
      <div className="">
        <a href="https://www.github.com/raiyanu/" className={`mr-4 text-sm underline ${darkTheme? "text-white" : "text-black"}`}>
          G
        </a>
        <a href="https://www.github.com/raiyanu/" className={`mr-4 text-sm underline ${darkTheme? "text-white" : "text-black"}`}>
          H
        </a>
        <a href="https://www.github.com/raiyanu/" className={`mr-4 text-sm underline ${darkTheme? "text-white" : "text-black"}`}>F</a>
      </div>
    </div>
    <h1>{darkTheme? "its Dark theme" : "its white theme" }</h1>
    <button onClick={() => toggleTheme()} className="m-4 p-2 bg-blue-400 text-white">Toggle Theme</button>
    </>
  );
}

export default card;
