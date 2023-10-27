import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import HeaderApp from '@/components/HeaderApp';
import Cookies from 'universal-cookie';

// TODO fazer a autorizacao herdar do login para esta pagina

function loggedinStatus() {

  const router = useRouter();
  const cookie = new Cookies();

    const [loggedInStatus, setLoggedInStatus] = useState([]);
      
      useEffect(() => { 
  
        const dataFech = async () => {

            console.log(cookie.get('token'));
              
            const data =  ( 
                await fetch('http://localhost:5000/api/users/loggedin')
              ).json();
  
            setLoggedInStatus(data);
        };
  
        dataFech();
  
      }, []);
  
      return (

        
        <div>

            <div>
                <HeaderApp/>
            </div>

            <div className='py-6'>
                Olá Mundo {JSON.stringify(loggedInStatus)}
            </div>
            
        
        </div>
  
      )
  
  };

export default loggedinStatus; 