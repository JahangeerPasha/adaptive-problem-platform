import React from 'react';
import { Group, Text, Button, Box } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ student, onLogout }) {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#4dd0e1' : '#fff',
    fontWeight: 500,
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  });

  return (
    <Box
      component="header"
      style={{
        height: '60px',
        margin: 0,
        padding: 0,
        backgroundColor: '#1a1a2e',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Left: Logo */}
      <Text size="xl" fw={700} style={{ fontFamily: 'Poppins, sans-serif', marginLeft: '1rem' }}>
        Adaptive <span style={{ color: '#4dd0e1' }}>Problem</span> Platform
      </Text>

      {/* Center: Navigation Links */}
      <Group spacing="md">
        <Link to="/" style={linkStyle('/')}>Profile</Link>
        <Link to="/problem" style={linkStyle('/problem')}>Today’s Problem</Link>
        <Link to="/topics" style={linkStyle('/topics')}>Topic Coverage</Link>
        <Link to="/performance" style={linkStyle('/performance')}>Performance</Link>
      </Group>

      {/* Right: Styled Logout Button */}
      <Box style={{ marginRight: '1rem' }}>
        <Button
          size="xs"
          variant="light"
          color="red"
          style={{
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: '6px',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a243dff')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d8282bff')}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Navbar;