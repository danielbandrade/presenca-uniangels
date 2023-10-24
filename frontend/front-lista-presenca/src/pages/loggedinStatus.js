import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import HeaderApp from '@/components/HeaderApp';

function loggedinStatus() {

  const router = useRouter();

    const [loggedInStatus, setLoggedInStatus] = useState([]);
      
      useEffect(() => { 
  
        const dataFech = async () => {
              const data = await ( 
                await fetch('http://localhost:5000/api/users/getuser'
                )
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