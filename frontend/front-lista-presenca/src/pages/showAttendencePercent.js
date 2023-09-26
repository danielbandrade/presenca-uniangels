import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import Datepicker from "react-tailwindcss-datepicker";

function showAttendencePercent() {

    const [attendecePercent, setCompleteAttendecePercent] = useState([]);
      
      useEffect(() => { 
  
        const dataFech = async () => {
              const data = await ( 
                await fetch('http://localhost:5000/api/attendences/calculatememberattendence'
                )
              ).json();
  
            setCompleteAttendecePercent(data);
        };
  
        dataFech();
  
      }, []);
  
      return (

        <div>
    
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Vonluntários de Startup UniAngels</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Informações básicas.</p>
          </div>
    
          {attendecePercent.attendenceCalculation ? (
            <ul role="list" className="divide-y divide-gray-100">
              {attendecePercent.attendenceCalculation.map((attendece, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{"Id membro: " +attendece._id}</p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">{"Reuniões Comparecidas: " + attendece.isPresentCount}</p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">{"Percentual de Presença: " + (attendece.presentPercent * 100).toFixed(0) + '%'}</p>
                </li>
              ))}
            </ul>
    
            ) : null    }   
        
    
        </div>
    
    
      )
  
  };

export default showAttendencePercent; 