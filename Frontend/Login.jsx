import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
function Login() {
  const handleLogin = (credentialResponse) => {
    console.log('Google Token:', credentialResponse.credential);

    // Send token to backend
    fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
    .then(res => res.json())
    .then(data => console.log('Backend response:', data))
    .catch(err => console.error('Login error:', err));
  };

  return (
    <GoogleLogin
      onSuccess={handleLogin}
      onError={() => console.log('Login Failed')}
      useOneTap
    />
  );
}

export default Login;