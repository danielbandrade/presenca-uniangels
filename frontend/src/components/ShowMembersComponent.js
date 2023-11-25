import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
const { format } = require('date-fns');

const ShowMembers = () => {

  const [membersList, setMemberList] = useState([]);
    
    useEffect(() => { 

      const dataFech = async () => {
            const data = await ( 
              await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/members/getmembers'
              )
            ).json();

        console.log(process.env.NEXT_PUBLIC_API_URL);
        //console.log(API_URL);

        setMemberList(data);
      };

      dataFech();

    }, []);

  return (

    <div>

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Vonluntários de Startup UniAngels</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Informações básicas.</p>
      </div>

    {membersList.selectedObjects ? (
        <ul role="list" className="divide-y divide-gray-100">
          {membersList.selectedObjects.map((member, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src= {'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{member.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{member.name + "@uniangels.com.br"}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">Vonluntário</p>
                {member.createdAt ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Criado em: <time dateTime={member.createdAt}>{member.createdAt}</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        ) : null    }   
    

    </div>


  )

};


export default  ShowMembers;

