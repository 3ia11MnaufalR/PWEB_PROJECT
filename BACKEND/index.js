const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Tambahkan cookie-parser

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser()); // Tambahkan middleware cookie-parser

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "nodejsdb",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE name = ? AND password = ?", [username, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    if (result.length > 0) {
      // Successful login
      const user = { id: result[0].id, email: result[0].email };

      // Generate a token
      const token = jwt.sign(user, "your_secret_key");

      // Set cookie with the token
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // Enable this if you are using HTTPS
      });

      // Send the token to the client
      return res.json({ token });
    } else {
      // Invalid credentials
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  db.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json({ message: "Registration successful" });
    }
  });
});

app.post("/logout", (req, res) => {
  // Hapus cookie dengan nama 'token'
  res.clearCookie("token");

  // Kirim respons berhasil logout
  res.json({ message: "Logout successful" });
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  db.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("You have registered successfully!");
    }
  });
});

app.get("/userdetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM users WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET name= ?, email= ?, password= ? WHERE id = ?";

  const values = [req.body.name, req.body.email, req.body.password];

  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

//app.listen(port, () => {
//	 console.log('Example app listening on port ${port}')
//})

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
