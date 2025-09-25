import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './src/components/Dashboard';

function App() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('student');
    if (stored) {
      setStudent(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student');
    setStudent(null);
  };

  const isAuthenticated = !!student;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login setStudent={setStudent} />
          }
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Dashboard student={student} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;