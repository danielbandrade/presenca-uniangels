import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
const { format } = require('date-fns');
import ShowMembers from '../components/ShowMembersComponent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HeaderApp  from '@/components/HeaderApp';
import ShowAttendencePercentComponent from '@/components/ShowAttendencePercentComponent';
import { Checkbox } from '@material-tailwind/react';
import Cookies from 'universal-cookie';


export default function Attendence() {

  const router = useRouter();
  const cookie = new Cookies();
  const secToken = cookie.get('token');
  const [membersAttendence, setSelectedMembers] = useState([]);
  const [membersList, setMemberList] = useState([]);
  const [submitStatus, setSubmitStatus] = useState([]);
  

    
    useEffect(() => { 

      const dataFech = async () => {
            const data = await ( 
              await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/members/getmembers', {   
                method: "GET", 
                headers: {
                  'Content-Type': 'application/json',
                  'x-acess-token': secToken
                },  
                mode: 'cors'
                }
              )
            ).json();

        setMemberList(data);
      };

      dataFech();

    }, []);


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

      try {
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL +'/api/attendences/register',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-acess-token': secToken
            },
            mode: 'cors',
            body: JSON.stringify(membersAttendenceRefactor),
          })
          
          if (response.ok) {
            console.log('registro de presenca funcionou');
            setSubmitStatus("Requisition worked!")
          } else {
            console.log('Registrou de presenca nao funcionou');
            setSubmitStatus("Requisition failed! " + response.json())
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


      <div className= "pb-10"> 

        <h2 className=" my-2 text-1xl font-bold ">Please check the present members below:</h2>
        <div >
          <DatePicker 
            className=" border-2 "
            dateFormat="dd/MM/yyyy"
            showIcon
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


          <div>
            
          {submitStatus}
          </div>
          
        </form>
      </div>     

      <div className= ""> 
        <ShowAttendencePercentComponent/>
      </div>
     
    </main>
  )
}