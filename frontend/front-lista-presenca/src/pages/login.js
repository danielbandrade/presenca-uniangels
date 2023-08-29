// pages/login.js
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';


// TODO fazer login encaminhar para ppágina de presença

const inter = Inter({ subsets: ['latin'] })

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          // Handle successful login response here
          router.push('/attendence');
        } else {
          // Handle login error response here
          console.log('Login failed!');
        }
      } catch (error) {
        // Handle error here
        console.error('Error:', error);
      }


  };

  return (
    <main
      className={`flex min-h-screen flex-col  justify-between p-24 ${inter.className}`}>
    
    <div >
      <h1>Página de Login Lista de Presença</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            style={{ color: 'red', margin: '10px'  }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            style={{ color: 'red', margin: '10px'  }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </main>
  );
};

export default Login;