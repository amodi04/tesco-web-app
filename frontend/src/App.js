import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import { ToastContainer } from "react-toastify";
import Home from "./components/home/index";
import Register from "./components/register/index";
import Login from "./components/login/index";
import Dashboard from "./components/dashboard/index";

import axios from "axios";
import RequireAuth from "./utils/RequireAuth";

if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
            <ToastContainer hideProgressBar={true} newestOnTop={true} />
          </UserProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
