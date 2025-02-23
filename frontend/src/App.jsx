import React from "react";
import VideoDisplay from "./components/Display";
import TopBusinesses from "./components/Top"
import AddBusinessForm from "./components/BusinessForm";
import UserForm from "./components/UserForm";

import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import VideoDisplay from "./components/Display";
import TopBusinesses from "./components/Top";
import Navbar from "./components/Navbar";

const ProtectedRoutes = ({ children }) => {
  const tokens = localStorage.getItem("authTokens");
  return tokens ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <>
                  <Navbar />
                  <VideoDisplay />
                </>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/top"
            element={
              <ProtectedRoutes>
                <>
                  <Navbar />
                  <TopBusinesses />
                </>
              </ProtectedRoutes>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
// import React from "react";
// import VideoDisplay from "./components/Display";
// import TopBusinesses from "./components/Top"

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// // import Login from "./pages/Login";
// import Login from "./components/Login";
// // import Register from "./pages/Register";
// import Register from "./components/Register";

// const App = () => {
//   return (
//     <div>
//         <AuthProvider>
//             <Router>
//               <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/" element={<VideoDisplay />} />
//                 <Route path="/top" element={<TopBusinesses />} />
//               </Routes>
//             </Router>
//         </AuthProvider>
//     </div>
//   );
// };

// export default App;