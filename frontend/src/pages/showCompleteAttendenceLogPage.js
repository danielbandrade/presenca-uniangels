import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ShowCompleteAttendenceLog from '@/components/ShowCompleteAttendenceLog'
import Datepicker from "react-tailwindcss-datepicker";
import HeaderApp from '@/components/HeaderApp';

function showCompleteAttendenceLogPage() {
  
  const router = useRouter();

    const deleteAttendenceDate = async (event) => {

        const dateToBeDeleted = value.startDate;

        //        event.preventDefault();
    
          try {
              const response = await fetch('http://localhost:5000/api/attendences/deleteattendencelog',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({dateToBeDeleted}),
              })
              
              if (response.ok) {
                console.log('data foi deletada funcionou');
              } else {
                console.log('data nao foi deletada');
                console.log(response);
              }
            } 
          catch (error) {
            console.error('Error:', error);
          }
    
        
      }

    const [value, setValue] = useState({
        startDate: new Date(),
      });
  
      const handleValueChange = newValue => {
        console.log("newValue:", newValue);
        setValue(newValue);
      };

    return (
        <main className={''}>
            <div>
               <HeaderApp/>
            </div>
            <div className="flex">
                <div className="w-2/5 p-2 border-2"> 
                    <div>Escolha aqui a data para deletar</div>
                    <Datepicker 
                        value={value}
                        primaryColor={"blue"}
                        asSingle={true}  
                        onChange={handleValueChange} 
                    /> 
                    <button className="my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full" onClick={deleteAttendenceDate} >Deletar Data</button>
                    </div>    
                
            
            <div className="w-2/5 p-2 border-2"><ShowCompleteAttendenceLog/></div>
        </div>
        <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/')}>
        Clique aqui para voltar ao inicio
        </button>
        </main>
    )
};

export default showCompleteAttendenceLogPage; 