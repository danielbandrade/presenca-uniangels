import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
const { format } = require('date-fns');
import Cookies from 'universal-cookie';

function ShowAttendencePercentComponent() {

    const router = useRouter();
  
    const cookie = new Cookies();
    const secToken = cookie.get('token');

      const [attendecePercent, setCompleteAttendecePercent] = useState([]);
        
      useEffect(() => { 
    
        const dataFech = async () => {
              
            const data =  await ( await fetch( process.env.NEXT_PUBLIC_API_URL + '/api/attendences/calculatememberattendence', {   
                method: "GET", 
                headers: {
                  'Content-Type': 'application/json',
                  'x-acess-token': secToken
                },  
                mode: 'cors' 
                })).json()
            
                setCompleteAttendecePercent(data);

        };
  
        dataFech();

  
        }, []);
    
        return (
  
          
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">UniAngels Startup Team Volunteers</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Basic Info</p>
            </div>
      
            {attendecePercent.attendenceCalculation ? (
              <ul role="list" className="divide-y divide-gray-100">
                {attendecePercent.attendenceCalculation.map((attendece, index) => (
                  <li key={index} className="flex justify-between gap-x-6 py-5">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{"Dados Completos: " +attendece.member[0].name}</p>
                      <p className="text-sm font-semibold leading-6 text-gray-900">{"Reuniões Comparecidas: " + attendece.isPresentCount}</p>
                      <p className="text-sm font-semibold leading-6 text-gray-900">{"Percentual de Presença: " + (attendece.presentPercent * 100).toFixed(0) + '%'}</p>
                  </li>
                ))}
              </ul>
      
              ) : null    }   
          </div>
    
        )
    
    };


export default  ShowAttendencePercentComponent;


