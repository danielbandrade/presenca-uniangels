import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import HeaderApp from '@/components/HeaderApp';
import Cookies from 'universal-cookie';

// TODO fazer a autorizacao herdar do login para esta pagina

function getUser() {

  const router = useRouter();
  const cookie = new Cookies();

    const [getUser, setGetUser] = useState([]);
      
      useEffect(() => { 
  
        const dataFech = async () => {

            // verifica como acessa cookie <> console.log(cookie.get('token'));
              
            const data = await ( await fetch('http://localhost:5000/api/users/getuser', {   
                method: "GET", 
                'credentials': 'include',
                })).json()
            
                setGetUser(data);
        };
  
        dataFech();
  
      }, []);
  
      return (

        
        <div>

            <div>
                <HeaderApp/>
            </div>

            <div className='py-6'>
                Olá Mundo {JSON.stringify(getUser)}
            </div>
            
        
        </div>
  
      )
  
  };

export default getUser; 