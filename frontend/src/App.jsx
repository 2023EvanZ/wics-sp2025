import React from "react";
import VideoDisplay from "./components/Display"; // Adjust path based on new structure

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LogoutButton from "./components/LogoutButton";

const App = () => {
  return (
    <div>
        <AuthProvider>
            <Router>
                <Routes>
                  <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<LogoutButton />} />
                </Routes>
            </Router>
        </AuthProvider>
        <h1>My React-Django App</h1>
        <VideoDisplay />
    </div>
  );
};

export default App;