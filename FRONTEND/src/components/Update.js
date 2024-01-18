//C:\react-js\my-app\src\components\Update.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/userdetails/" + id)
      .then((res) => {
        console.log(res);
        setUser(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/users/${userId}`, user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Edit Form</h1>
      <form>
        <div className="mb-3 mt-3">
          <label className="form-label"> ID:</label>
          <input
            type="text"
            className="form-control"
            id="id"
            placeholder="Enter Your Full Name"
            name="id"
            value={id}
            disabled
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label"> Full Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Full Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Update
        </button>
        &nbsp;
        <Link to="/">
          <button className="btn btn-primary">Cancel</button></Link>
      </form>
    </div>
  );
};

export default Update;
