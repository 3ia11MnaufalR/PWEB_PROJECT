import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Add from "./components/Add";
import Read from "./components/Read";
import Users from "./components/Users";
import Update from "./components/Update";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";

// function ProtectedRoute({ element }) {
//   const token = localStorage.getItem("token");

//   // If user is not authenticated, redirect to login
//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   // Render the protected route
//   return element;
// }

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check if the user is authenticated on component mount
  //   const token = localStorage.getItem("token");
  //   setIsAuthenticated(!!token);
  // }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          {/* Protect routes using the ProtectedRoute component */}
          <Route path="/" element={<Users />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;