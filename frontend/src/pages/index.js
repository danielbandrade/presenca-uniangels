import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeaderApp from '@/components/HeaderApp';
import Cookies from 'universal-cookie';
import axios from 'axios';
import HeaderAppIndex from '@/components/HeaderAppIndex';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const cookies = new Cookies({ path: '/' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response =  await ( await  fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors' ,
          body: JSON.stringify({ email, password }),
        }) ).json()

        if (response.token) {
          // Parece que a origem do problema esta aqui , pode ser esse cookie manua
          cookies.set('token', response.token,  { 'path': '/', 'sameSite': 'none', 'secure': 'true', expires: new Date(Date.now() + 1000 * 84600)}); 
          router.push('/getUserPage');

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


    <HeaderAppIndex/>

    <div className='py-6'>
      <div className='text-2xl red-600 font-bold'>Welcome, please login and you will see!</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            className='my-2 mx-2  border-2 font-bold py-2 px-4 '
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