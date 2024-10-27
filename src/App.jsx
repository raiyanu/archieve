import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name, age }));
	}

	return (
		<main className="container">
			<h1>Welcome to Tauri + React</h1>
			<p>Click on the Tauri, Vite, and React logos to learn more.</p>

			<form
				className="row"
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
				style={{
					display: "flex",
					marginBlock: "auto",
					flexDirection: "column",
					alignItems: "center",
					gap: "1rem",
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<input
					type="number"
					id="greet-input age"
					onChange={(e) => setAge(parseInt(e.currentTarget.value))}
					placeholder="Enter a your age..."
				/>
				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>
		</main>
	);
}

export default App;
