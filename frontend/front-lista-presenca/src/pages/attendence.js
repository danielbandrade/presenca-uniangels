import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
const { format } = require('date-fns');

// TODO: criar todos os membros no backend
// TODO criar e usar componente que exibe membros 
// TODO refatorar lista de presentes para sempre conter todos os membros e mudar flag de presente 
// documentacao css https://v1.tailwindcss.com/components/buttons


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



export default function Attendence({ membersList }) {

  const router = useRouter();
  const [membersAttendence, setSelectedMembers] = useState([]);
  const membersAttendenceRefactor = []; 


  // const [membersAttendenceRefactor, setSelectedMembersRefactor] = useState([]);
  // TODO refatorar lista de presentes para sempre conter todos os membros e mudar flag de presente 


  const handleSelectItem = (selectedMember) => {

    if (membersAttendence.includes(selectedMember)) {
      // Item is already selected, so remove it from the selection
      setSelectedMembers(membersAttendence.filter((member) => member !== selectedMember));
    } else {
      // Item is not selected, so add it to the selection
      setSelectedMembers([...membersAttendence, selectedMember]);
    }

  };

  const registerAttendence = async (event) => {

    let membersAttendenceRefactor = [];

    event.preventDefault();
    //console.log(attendenceHandle());
    //console.log(membersList);
    // console.log(membersAttendence);

    membersList.selectedObjects.map( member => {
      // TODO ele não está persistindo os dois membros na variável
      if (membersAttendence.some(memberIterate => memberIterate.name === member.name) ) {
        membersAttendenceRefactor['name'] = member.name;
        membersAttendenceRefactor['isPresent'] = true;
        membersAttendenceRefactor['date'] = format(Date.now(), 'yyyy-MM-dd');
        console.log(membersAttendenceRefactor);
        }
      else{
        membersAttendenceRefactor['name'] = member.name;
        membersAttendenceRefactor['isPresent'] = false;
        membersAttendenceRefactor['date'] = format(Date.now(), 'yyyy-MM-dd');
        console.log(membersAttendenceRefactor);
      }
    })

    console.log(membersAttendenceRefactor);



      try {
          const response = fetch('http://localhost:5000/api/attendences/register',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(membersAttendenceRefactor),
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
        {membersList.selectedObjects.map((member, index) => (

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
            {membersList.selectedObjects.map((member, index) => (
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
