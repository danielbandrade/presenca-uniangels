import { useRouter } from 'next/router';
import React, { useState } from 'react';
const { format } = require('date-fns');


// TODO 1 tranformar essa página na presença dos membros
// TODO  2 fazer esse componente funcionar de verdade

export async function getServerSideProps() {

  // Busca os membros

  const response = await fetch('http://localhost:5000/api/members/getmembers');
  const membersList = await response.json();

  return {
    props: {
      membersList,
    },
  };
}


const ShowMembers = ({ membersList }) => {

  console.log(membersList);

  return (
  
    <div className="flex">
      <div className=" w-1/2 p-2 border-2" >
        <h1 className=" flex text-1xl font-bold ">Estes são os membros</h1>
        <div className="">
          <ul>
            {membersList.selectedObjects.map((member, index) => (
              <li key={index}>
                <div className="border-2">
                  {member.name}
                </div>
                <div className="border-2" > Criado em: {format(Date.parse(member.createdAt), 'dd/MM/yyyy')}
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  
  )

};

export default ShowMembers;


