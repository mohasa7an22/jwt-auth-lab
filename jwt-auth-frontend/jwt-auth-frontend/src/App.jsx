import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import MyEntries from "./pages/MyEntries";
import Entries from "./pages/Entries";
import NewEntry from "./pages/NewEntry";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import EditEntry from "./pages/EditEntry";
function App() {
      const something = useAuth()
      console.log(something)
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/my-entries" element={<ProtectedRoute><MyEntries /></ProtectedRoute>} />
        <Route path="/entries" element={<Entries />} /> 
        <Route path='new-entry' element={<ProtectedRoute><NewEntry /></ProtectedRoute>} />
        <Route path='/entries/:id' element={<ProtectedRoute><EditEntry/></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
