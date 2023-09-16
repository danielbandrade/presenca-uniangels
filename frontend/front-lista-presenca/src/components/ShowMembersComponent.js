import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
const { format } = require('date-fns');

// TODO fazer a exibicao de membros ficar mais amigável

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

  return (

    <div>

    {membersList.selectedObjects ? (

        <div className="">
          <div className="p-2 border-2" >
            <h1 className="text-1xl font-bold ">Estes são os membros</h1>
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
                )) }
              </ul> 
            
            </div>
          </div>
        </div>
      ) : null }

    </div>


  )

};


export default  ShowMembers;