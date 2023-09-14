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
  ///const [membersAttendenceRefactor, setSelectedMembersRefactor] = useState([]);


  // const [membersAttendenceRefactor, setSelectedMembersRefactor] = useState([]);


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

    event.preventDefault();
    //console.log(membersList);
    //console.log(membersAttendence);

    const membersAttendenceRefactor = membersList.selectedObjects.map( memberIterate => {
      const {name} = memberIterate;
      const date = format(Date.now(), 'yyyy-MM-dd')

      let isPresent = false;

      if(membersAttendence.includes(memberIterate)){
        isPresent = true;
      }

      return {
        name,
        date,
        isPresent
      };
    })

    console.log(membersAttendenceRefactor);

      try {
          const response = await fetch('http://localhost:5000/api/attendences/register',{
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
            console.log(response);
          }
        } 
      catch (error) {
        console.error('Error:', error);
      }
}
  return (
    
    <main>

      <div className= "flex">

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
      </div>

      <div className= "w-2/5 p-2 border-2"> 

        <h2 className=" my-2 text-1xl font-bold ">Lista de presença dos membros em {format(Date.now(), 'dd/MM/yyyy')}</h2>
        <form className=" my-2">
          <ul>
            {membersList.selectedObjects.map((member, index) => (
              <li key={index}>
                <label className=" my-2 text-1xl  ">
                  {member.name}
                  <input
                    className="appearance-none border-2 rounded mx-6 -my-1 py-2 px-2 leading-tight checked:bg-red-700"
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

      </div>
    </main>
  )
}
