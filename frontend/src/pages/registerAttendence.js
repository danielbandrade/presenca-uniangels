import { useRouter } from 'next/router';
import React, { useState } from 'react';
const { format } = require('date-fns');
import ShowMembers from '../components/ShowMembersComponent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HeaderApp  from '@/components/HeaderApp';
import ShowAttendencePercentComponent from '@/components/ShowAttendencePercentComponent';
import { Checkbox } from '@material-tailwind/react';

// TODO ajustar date picker https://reactdatepicker.com/
// TODO ajustar essa tela para ficar amigável

export async function getServerSideProps() {

  // Busca os membros

  const membersList = await ( await fetch('http://localhost:5000/api/members/getmembers', {   
    method: "GET", 
    'credentials': 'include',
    })).json();

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

    // TODO inserir aqui uma forma de só fazer carregar quando memberlist existir, possivelmente "??""

    const membersAttendenceRefactor = membersList.selectedObjects.map( memberIterate => {
      const {name} = memberIterate;
      const date = startDate;

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

    const [startDate, setStartDate] = useState(new Date());

  return (
    
    <main>
      <div>
        <HeaderApp/>
      </div>

      <div className= "flex">

      <div className= "w-2/5 p-2"> 
        <ShowAttendencePercentComponent/>
      </div>

      <div className= "w-2/5 p-2 "> 

        <h2 className=" my-2 text-1xl font-bold ">Please check the online members below:</h2>
        <div >
          <DatePicker 
            className="border-zinc-950 "
            dateFormat="dd/MM/yyyy"
            showIcon
            border= "solid 2px pink" 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} />
        </div>
        <form className=" my-2">
          <ul>
            { membersList.selectedObjects ? ( membersList.selectedObjects.map((member, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <p className="text-sm font-semibold leading-6 text-gray-900">{member.name}</p>    
                  <Checkbox
                    className="border-2 border-zinc-950 lg rounded mx-6 -my-1 py-2 px-2 leading-tight checked:bg-red-700"               
                    checked={membersAttendence.includes(member)}
                    onChange={() => handleSelectItem(member)}
                  />
              </li>
            )) ) : null }
          </ul>
          
          <button className="my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full" onClick={registerAttendence} >Registrar Presença</button>
        </form>
      </div>

      </div>
    </main>
  )
}
