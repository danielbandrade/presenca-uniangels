import { useRouter } from 'next/router';
import React, { useState } from 'react';
const { format } = require('date-fns');





const  showMembers = () => {

    return <div className='black'>
            This is my component!
            
            <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/login')}>
            Clique aqui para ir para o login
            </button>
            </div>;

};

export default showMembers;


/* return <div className= "flex">

      <div className= " w-1/2 p-2 border-2" >
        <h1 className=" flex text-1xl font-bold ">Estes são os membros</h1>
          <div className= "">
            <ul>
              {membersList.selectedObjects.map((member, index) => (
                <li key={index}>
                  <div className= "border-2">
                    {member.name} 
                  </div>
                    <div className="border-2" > Criado em: {format(Date.parse(member.createdAt), 'dd/MM/yyyy')} 
                    </div> 
                  
                </li>
              ))}
          </ul>
        </div>
    </div> */