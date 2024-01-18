import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(event) {
    // event.preventDefault();

    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.token);
        // handle success
        localStorage.setItem('myToken', response.data.token);
        window.location.href = "/"
      })
      .catch((error) => {
        console.log(error);
        alert("getting data eror");
        // handle error
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <main className="form-signin">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating mb-3">
            <input type="username" className="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="floatingInput">username</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="button" onClick={handleLogin}>
            Sign in
          </button>
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
