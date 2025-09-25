import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdaptiveProblem from '../../AdaptiveProblem';
import PerformanceSummary from './PerformanceSummary';
import Profile from './Profile';
import Navbar from './Navbar';
import TopicCoverage from './TopicCoverage';
import { Container } from '@mantine/core';

function Dashboard({ student }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <Navbar student={student} onLogout={handleLogout} />

      {/* Main Content */}
      <Container size="lg" pt={0}>
        <Routes>
          <Route path="/" element={<Profile student={student} />} />
          <Route path="/problem" element={<AdaptiveProblem studentId={student._id} />} />
          <Route path="/topics" element={<TopicCoverage studentId={student._id} />} />
          <Route path="/performance" element={<PerformanceSummary studentId={student._id} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default Dashboard;