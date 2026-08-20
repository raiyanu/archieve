const URL = "http://localhost:6969/api";

import axios from "axios";

const Auth = class {
  constructor() {
    this.authenticated = false;
  }
  login(username, password, onerr) {
    if (username === "" || password === "") {
      onerr({ body: "please enter username and password", tittle: "input" });
      console.log("username and password are required");
      return;
    }
    console.log("user: ", username, "password: ", password);
    // make a login request
    fetch(URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          onerr({
            body: "please enter username and password",
            tittle: "input",
          });
        } else {
          onerr({
            body: data.tittle,
            tittle: data.message,
          });
          console.log(username);
        }
      });
  }
  async signup(
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    remember,
    email,
    onerr,
    onOpenChange,
  ) {
    console.log("password: ", password, "confirmPassword: ", confirmPassword);
    if (
      !username ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !email
    ) {
      onerr({
        body: "Please fill in all required fields.",
        title: "Incomplete Information",
      });
      console.log("Incomplete Information");
      return false;
    }

    // Password length check
    if (password.length <= 8) {
      onerr({
        body: "Password must be more than 8 characters long.",
        title: "Short Password",
      });
      return false;
    }

    // Password match check
    if (password !== confirmPassword) {
      onerr({ body: "Passwords do not match.", title: "Password Mismatch" });
      return false;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      onerr({ body: "Invalid email format.", title: "Invalid Email" });
      return false;
    }
    if (username === "" || password === "") {
      onerr({ body: "please enter username and password", tittle: "input" });
      console.log("username and password are required");
      return;
    }

    try {
      // replace response with axios
      const response = await axios.post(URL + "/signup", {
        username,
        firstName,
        lastName,
        password,
        remember,
        email,
      });

      if (response.ok) {
        // Registration was successful
        console.log("User registered successfully!");
        const data = await response.json();
        console.log("sign up response: ", data.message);
        if (!data.success) {
          onerr({ body: data.message, title: "Failed" });
          return;
        }
        alert(data.message, " sign up successfull!");
        onOpenChange();
      } else {
        onerr({
          body: "Failed",
          title: "Something went wrong, please try again. <Server!> ",
        });
        // Handle registration failure (e.g., display error message)
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      onerr({
        body: "Failed",
        tittle: "Something went wrong, please try again. <Client!> ",
      });
    }
  }

  isAuthenticated() {
    fetch(URL + "/greet", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          console.log(data.username);
        }
      });
    return this.authenticated;
  }
  // repace this greet method with fetch to axios , i found axios easier to use
  greet() {
    axios
      .get("/api/greet", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("request completed");
      });
  }
};

export default new Auth();
