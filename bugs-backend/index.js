const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
const bugs = [
	{ id: 3, description: "Lotta bugs id:3" },
	{ id: 4, description: "Lotta bugs id:4" },
	{ id: 5, description: "Lotta bugs id:5" },
	{ id: 6, description: "Lotta bugs id:6" },
];

app.get("/api/bugs", async (req, res) => {
	await setTimeout(() => {
		res.json(bugs);
	}, 3000);
});

app.post("/api/bugs", (req, res) => {
	const bug = { id: Date.now(), resolved: false, ...req.body };
	bugs.push(bug);
	res.json(bug);
});

app.get("/api", (req, res) => {
	res.send("Hello baka!");
});

app.patch("/api/bugs/:id", (req, res) => {
	const index = bugs.findIndex((bug) => bug.id === parseInt(req.params.id));
	const bug = bugs[index];
	if ("resolved" in req.body) bug.resolved = req.body.resolved;
	if ("userId" in req.body) bug.userId = req.body.userId;

	res.json(bug);
});

app.listen(9001, () => {
	console.log("Node server started on port 9001.");
});
