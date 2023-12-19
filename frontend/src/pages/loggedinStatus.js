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
  const secToken = cookie.get('token');



    const [loggedInStatus, setLoggedInStatus] = useState([]);
      
      useEffect(() => { 
  
        const dataFech = async () => {

            // verifica como acessa cookie <> console.log(cookie.get('token'));
              
            const data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users/loggedin', {   
                method: "GET", 
                headers: {
                  'Content-Type': 'application/json',
                  'x-acess-token': secToken
                },  
                mode: 'cors'
                })
            
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
                Olá Mundo 
            </div>
            
        
        </div>
  
      )
  
  };

export default loggedinStatus; 