import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Perform the registration logic here (e.g., API request to /register endpoint)
    // If registration is successful, you can navigate to the login page or any other page

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful registration, navigate to the login page
        navigate("/login");
      } else {
        // Handle registration failure (e.g., display an error message)
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container">
      <main className="form-signin w-100 mx-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
  <label htmlFor="floatingName">Name</label>
</div>

<div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
  <label htmlFor="floatingInput">Email address</label>
</div>

<div className="form-floating mb-3">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
  <label htmlFor="floatingPassword">Password</label>
</div>
          <button className="btn btn-primary w-100 py-2" type="button" onClick={handleRegister}>
            Register
          </button>
          <p className="mt-3">
  Already have an account? <Link to="/login">Login here</Link>
</p>
        </form>
      </main>
    </div>
  );
}

export default Register;