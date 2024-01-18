import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";


const Read = () => {
  const { id } = useParams();
  const [user, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/userdetails/" + id)
      .then((res) => {
        console.log(res);
        setUsers(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>User Details</h1>
          <table className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Full Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <Link to="/">cancel</Link>
      </div>
    </div>
  );
};

export default Read;
