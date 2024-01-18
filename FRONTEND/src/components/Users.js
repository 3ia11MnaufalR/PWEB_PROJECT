import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  var token=localStorage.getItem('myToken');
  console.log(token)
  if (token=='') {
    window.location.href = "/login"
  }
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('myToken', "");
      navigate("/login");
  };

  var tampilan=  (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">
        Daftar Member Lestari Laundry 
      </h2>
      <div className="row">
        <div className="col-md-12">
          <p>
            <Link to="/add" className="btn btn-success">
              Add new users
            </Link>
            <button onClick={handleLogout} className="btn btn-warning mx-2">
              Logout
            </button>
          </p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{user.name} </td>
                    <td>{user.email} </td>
                    <td>
                      <Link
                        to={`/read/${user.id}`}
                        className="btn btn-success mx-2"
                      >
                        Read
                      </Link>
                      <Link
                        to={`/update/${user.id}`}
                        className="btn btn-info mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  if (token=='') {
    tampilan=''
  }
  return tampilan
};

export default Users;
