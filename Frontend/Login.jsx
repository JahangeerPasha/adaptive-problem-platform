import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login({ setStudent }) {
  // Load student from localStorage on initial render
  useEffect(() => {
    const storedStudent = localStorage.getItem('student');
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, [setStudent]);

  const handleLogin = (credentialResponse) => {
    fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Backend response:', data);
        localStorage.setItem('student', JSON.stringify(data.student)); // persist login
        setStudent(data.student); // update app state
      })
      .catch(err => console.error('Login error:', err));
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          borderRadius: '1rem',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: 'white', marginBottom: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
          Login to <span style={{ fontWeight: 'bold' }}>Adaptive Problem Platform</span>
        </h2>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => console.log('Login Failed')}
          useOneTap
          theme="filled_black"
          width={250}
        />
      </div>
    </div>
  );
}

export default Login;