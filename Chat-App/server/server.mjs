import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { signup } from "./db.js";
const app = express();
const port = process.env.PORT || 6969;

// Get the directory name using __dirname
const __dirname = path.resolve();

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:6968", credentials: true }));
app.get("/api", (req, res) => {
  res.send("Hello there, the server is online and api");
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    console.log("cookies recieved: " + req.cookies.user_session_id);
  } catch (err) {
    console.log("error: " + err);
  }
  // Simulating authentication
  if (!auth({ username, password })) {
    res.send(
      JSON.stringify({
        tittle: "login failed",
        message: "username or password is incorrect",
      }),
    );
    return;
  }

  const user_session_id = generateSessionId(20);

  // Set the cookie without 'httpOnly: true'
  res.cookie("user_session_id", user_session_id, {
    maxAge: 900000,
  });

  addSession({ username: req.body.username, sessionId: user_session_id });

  res.send(
    JSON.stringify({
      message: "login Success",
      cookie: user_session_id,
    }),
  );
});

// Greet endpoint
app.get("/api/greet", (req, res) => {
  console.log("----------------------------------------------------------");
  try {
    const sessionId = req.cookies.user_session_id;
    console.log("session cookie: " + sessionId);
    console.log("cookie resources: ", req.cookies);
  } catch (error) {
    console.log("----------------------------------------------------------");
    console.log("error while taking cookies : " + error);
  }
  if (req.cookies.user_session_id) {
    res.send(
      JSON.stringify({
        message: "Hello there, i got cookies mr. ",
      }),
    );
    return;
  }
  res.send(JSON.stringify({ message: "cookies i need cookies" }));
});

// Signup endpoint
app.post("/api/signup", (req, res) => {
  console.log("progress started to add user");
  if (checkUser(req.body.username)) {
    res.send(
      JSON.stringify({
        message: "signup failed",
        reason: "username already exists",
        success: false,
      }),
    );
    return;
  }

  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      remember: req.body.remember,
      email: req.body.email,
    };

    users.push(user);
    console.log("database push started :", user);
    signup(
      user.username,
      user.password,
      user.firstName,
      user.lastName,
      user.email,
    );
    console.log("database push finished");
  } catch (err) {
    res.send(
      JSON.stringify({
        message: "signup failed",
        reason: "required data hasn't been provided",
      }),
    );
    return;
  }

  const user_session_id = generateSessionId(20);

  // Set the cookie without 'httpOnly: true'
  res.cookie("user_session_id", user_session_id, {
    maxAge: 900000,
  });

  addSession({ username: req.body.username, sessionId: user_session_id });

  res.send(JSON.stringify({ message: "signup Success" }));
});

// Logout endpoint
app.delete("/api/login", (req, res) => {
  console.log("logout request: ", req.cookies.user);
  res.clearCookie("user_session_id");

  const index = user_session_id.findIndex(
    (element) => element.username === req.body.user,
  );

  if (index > -1) {
    user_session_id.splice(index, 1);
  }

  res.send(JSON.stringify({ message: "logout Success" }));
});

// Additional functions
const auth = (user) => {
  return users.some(
    (u) => u.username === user.username && u.password === user.password,
  );
};

const users = [];
const user_session_ids = [];

const addSession = (user) => {
  user_session_id.push(user);
};

const checkUser = (username) => {
  return users.some((u) => u.username === username);
};

app.listen(6969, () => {
  console.log("Server listening on port 6969");
});

function generateSessionId(length) {
  let sessionId = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sessionId += characters.charAt(randomIndex);
  }

  return sessionId;
}
