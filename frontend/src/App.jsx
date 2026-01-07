import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeEditor from "./pages/ResumeEditor";
import PublicResume from "./pages/PublicResume";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />

      <Route
        path="/editor/:id"
        element={<ProtectedRoute><ResumeEditor /></ProtectedRoute>}
      />

      <Route path="/resume/:id" element={<PublicResume />} />
    </Routes>
  </BrowserRouter>
);


export default App;
