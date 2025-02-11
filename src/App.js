import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from './pages/Home';
import { ContextProvider } from "./context/Context";
import ForgotPassword from "./pages/ForgotPassword";
import { Context } from "./context/Context";
import { useContext } from "react";

function App() {
  return (
    <ContextProvider>  
      <Router>
        <AppContent />
      </Router>
    </ContextProvider>
  );
}

function AppContent() {
  const { token } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;