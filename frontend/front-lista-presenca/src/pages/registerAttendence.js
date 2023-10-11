import { useRouter } from 'next/router';
import React, { useState } from 'react';
const { format } = require('date-fns');
import ShowMembers from '../components/ShowMembersComponent';
import Datepicker from "react-tailwindcss-datepicker";

// TODO ajustar 
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

    event.preventDefault();;

    const membersAttendenceRefactor = membersList.selectedObjects.map( memberIterate => {
      const {name} = memberIterate;
      const date = value.startDate;

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

    const [value, setValue] = useState({
      startDate: new Date(),
    });

    const handleValueChange = newValue => {
      console.log("newValue:", newValue);
      setValue(newValue);
    };

  return (
    
    <main>

      <div className= "flex">

      <div className= "w-2/5 p-2"> 
        <ShowMembers/>
      </div>

      <div className= "w-2/5 p-2 "> 

        <h2 className=" my-2 text-1xl font-bold ">Lista de presença dos membros em {}</h2>
        <div>
          <Datepicker 
            value={value}
            primaryColor={"blue"}
            asSingle={true}  
            onChange={handleValueChange} 
          />
        </div>
        <form className=" my-2">
          <ul>
            {membersList.selectedObjects.map((member, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <p className="text-sm font-semibold leading-6 text-gray-900">{"Id membro: " +member.name}</p>    
                  <input
                    className="appearance-none border-2 rounded mx-6 -my-1 py-2 px-2 leading-tight checked:bg-red-700"
                    type="checkbox"
                    value={member.name}
                    checked={membersAttendence.includes(member)}
                    onChange={() => handleSelectItem(member)}
                  />
              </li>
            ))}
          </ul>
          
          <button className="my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full" onClick={registerAttendence} >Registrar Presença</button>
        </form>
      </div>

      </div>

      <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/')}>
        Clique aqui para voltar ao inicio
      </button>
    </main>
  )
}
