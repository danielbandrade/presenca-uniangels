// pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeaderApp from '@/components/HeaderApp';


// TODO Fazer a página de login funcionar
// TODO P1 cadastrar membros do uniangels e fazer POC de preenchimento de presenca
// TODO P2 fazer login passar o cookie de protecao para página de presenca usando js coockie 


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
          console.log("login funcionou " + response.body)
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
    <main>
    <div>
          <HeaderApp/>
    </div>

    <div>
      <h1>Página de Login Lista de Presença</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            className='my-2 mx-2 border-2 font-bold py-2 px-4 '
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className='my-2 mx-2 border-2 font-bold py-2 px-4 '
            value={password}
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