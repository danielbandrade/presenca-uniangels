import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
const { format } = require('date-fns');

// TODO 1 entender por que o fetch não funciona com componente
// TODO 2 tranformar essa página na presença dos membros


// export async function getServerSideProps() {

//   // Busca os membros

//   const response = await fetch('http://localhost:5000/api/members/getmembers');

//   console.log(response);
//   const membersList = await response.json();

//   return {
//     props: {
//       membersList,
//     }
//   };
// }


const ShowMembers = () => {

  const [membersList, setMemberList] = useState([]);
    
    useEffect(() => { 

      const dataFech = async () => {
            const data = await ( 
              await fetch('http://localhost:5000/api/members/getmembers'
              )
            ).json();

        setMemberList(data);
      };

      dataFech();

    }, []);

  const memberListJson = membersList.selectedObjects;
  console.log(memberListJson);

  return (

    <div>{JSON.stringify(memberListJson)}</div>
  
  )

};


export default  ShowMembers;


/*

import React, {useState, useEffect} from "react"

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    
    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get('/posts'); 
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return <div>{posts}</div>
}




<div className="flex">
      <div className=" w-1/2 p-2 border-2" >
        <h1 className=" flex text-1xl font-bold ">Estes são os membros</h1>
        <div className="">
        <ul>
            {memberListJson.map((member, index) => (
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



*/