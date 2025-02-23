import React from "react";
import VideoDisplay from "./components/Display";
import TopBusinesses from "./components/Top"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Login from "./pages/Login";
import Login from "./components/Login";
// import Register from "./pages/Register";
import Register from "./components/Register";

const App = () => {
  return (
    <div>
        <AuthProvider>
            <Router>
              <nav>
                <h1>Go Loco</h1>
                {/* <ul>
                  <li><Link to="/">Video Display</Link></li>
                  <li><Link to="/top">Top Businesses</Link></li>
                </ul> */}
              </nav>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<VideoDisplay />} />
                <Route path="/top" element={<TopBusinesses />} />
              </Routes>
            </Router>
        </AuthProvider>
    </div>
  );
};

export default App;