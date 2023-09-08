import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
const { format } = require('date-fns');

// TODO: fazer a tela de registro de presenca
// TODO: criar todos os membros no backend
// TODO entender pq a lista dos membros selecionados nao eh exibida
// TODO criar e usar componente que exibe membros 
// documentacao css https://v1.tailwindcss.com/components/buttons


export async function getServerSideProps() {

  // Busca os membros

  const response = await fetch('http://localhost:5000/api/members/getmembers');
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}



export default function Attendence({ data }) {

  const router = useRouter();
  const [membersAttendence, setSelectedMembers] = useState([]);

  const handleSelectItem = (member) => {


    if (membersAttendence.includes(member)) {
      // Item is already selected, so remove it from the selection
      setSelectedMembers(membersAttendence.filter((selectedMember) => selectedMember !== member));
    } else {
      // Item is not selected, so add it to the selection
      setSelectedMembers([...membersAttendence, member]);
    }

  };

  const registerAttendence = async (event) => {
    event.preventDefault();
    // const router = useRouter();

      try {
          const response = fetch('http://localhost:5000/api/attendences/register',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: members,
          })
          
          if (response.ok) {
            router.push('/attendence');
            console.log('registro de presenca funcionou');
          } else {
            console.log('Registrou de presenca nao funcionou');
          }
        } 
      catch (error) {
        console.error('Error:', error);
      }
}
  return (
    
    <main>
      <h1 className=" flex text-1xl font-bold ">Estes são os membros</h1>
      <ul>
        {data.selectedObjects.map((member, index) => (

          <li key={index}>
            <div>
              {member.name} 
              <a className=" text-xs" > Criado em: {format(Date.parse(member.createdAt), 'dd/MM/yyyy')} 
              </a> 
            </div>
          </li>

        ))}
      </ul>

      <div>

        <h2 className=" my-2 text-1xl font-bold ">Lista de presença dos membros em {format(Date.now(), 'dd/MM/yyyy')}</h2>
        <form className=" my-2">
          <ul>
            {data.selectedObjects.map((member, index) => (
              <li key={index}>
                <label>
                  {member.name}
                  <input
                    className="appearance-none border-2 rounded mx-2 py-2 px-2 leading-tight checked:bg-red-700"
                    type="checkbox"
                    value={member.name}
                    checked={membersAttendence.includes(member)}
                    onChange={() => handleSelectItem(member)}
                  />
                </label>
              </li>
            ))}
          </ul>
          <p>Membros presentes: {membersAttendence.map(member => member.name).join(', ')} </p>
                            


          <button className="my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full" onClick={registerAttendence} >Registrar Presença</button>
        </form>
      </div>

    </main>
  )
}
