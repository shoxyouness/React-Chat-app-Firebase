import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import classes from "./App.module.css"
import { createRoot } from "react-dom/client";
import { AuthContext } from "./store/Auth-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(" aa" + currentUser);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
