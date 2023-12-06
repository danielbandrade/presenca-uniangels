import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import HeaderApp from '@/components/HeaderApp';

function showAttendencePercent() {

  const router = useRouter();

    const [attendecePercent, setCompleteAttendecePercent] = useState([]);
      
      useEffect(() => { 
  
        const dataFech = async () => {
            const data = await ( await fetch( process.env.NEXT_PUBLIC_API_URL +'/api/attendences/calculatememberattendence', {   
              method: "GET", 
              'credentials': 'include'
            })).json()
  
            setCompleteAttendecePercent(data);
        };
  
        dataFech();
  
      }, []);
  
      return (

        
        <div>

          <div>
            <HeaderApp/>
          </div>
    
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Vonluntários de Startup UniAngels</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Informações básicas.</p>
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
        

        <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/')}>
          Clique aqui para voltar ao inicio
        </button>
        </div>
  
      )
  
  };

export default showAttendencePercent; 







/* 





*/