import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
const { format } = require('date-fns');

// TODO a pagina nao carrega

const ShowCompleteAttendenceLog = () => {

  const [completeAttendeceLog, setCompleteAttendeceLog] = useState([]);
    
    useEffect(() => { 

      const dataFech = async () => {
            const data = await ( 
              await fetch('http://localhost:5000/api/attendences/getAttendenceLog'
              )
            ).json();

        setCompleteAttendeceLog(data);
      };

      dataFech();

    }, []);

  return (

    <div>

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Vonluntários de Startup UniAngels</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Informações básicas.</p>
      </div>

    {completeAttendeceLog.attendenceCompleteLog ? (
        <ul role="list" className="divide-y divide-gray-100">
          {completeAttendeceLog.attendenceCompleteLog.map((attendece, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
                <p className="text-sm font-semibold leading-6 text-gray-900">{attendece.member}</p>
                <p className="text-sm font-semibold leading-6 text-gray-900">{attendece.isPresent}</p>
            </li>
          ))}
        </ul>

        ) : null    }   
    

    </div>


  )

};


export default  ShowCompleteAttendenceLog;


