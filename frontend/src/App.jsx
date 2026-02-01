import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeEditor from "./pages/ResumeEditor";
import PublicResume from "./pages/PublicResume";

import ProtectedRoute from "./components/ProtectedRoute";
import SiteLayout from "./components/layouts/SiteLayout";
import PageTransition from "./components/PageTransition";

/* Wrapper to access location */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<SiteLayout />}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />

          <Route
            path="/register"
            element={
              <PageTransition>
                <Register />
              </PageTransition>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <ResumeEditor />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/resume/:id"
            element={
              <PageTransition>
                <PublicResume />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);

export default App;
