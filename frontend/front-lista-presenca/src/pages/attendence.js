import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
const { format } = require('date-fns');

// TODO: fazer a tela de registro de presenca
// TODO: criar todos os membros no backend
// TODO entender pq a lista dos membros selecionados nao eh exibida
// TODO ajustar o date time para exibir somente a data
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


const registerAttendence = async () => {

  // const router = useRouter();

  // TODO fazer o resgistro de presenca funcinar atraves da ligacao com o backend

  console.log("increment like count")

  try {
    const response = await fetch('http://localhost:5000/api/attendences/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            name: 'Alan',
            date: '2023-08-31',
            isPresent: 'true'
          }
        ),
      });

    if (response.ok) {
      // Handle successful login response here
      router.push('/attendence');
      console.log('registro de presenca funcionou');
    } else {
      // Handle login error response here
      console.log('Registrou de presenca nao funcionou');
    }
  } catch (error) {
    // Handle error here
    console.error('Error:', error);
  }

}



export default function Attendence({ data }) {

  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (item) => {

    if (selectedItems.includes(item)) {
      // Item is already selected, so remove it from the selection
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      // Item is not selected, so add it to the selection
      setSelectedItems([...selectedItems, item]);
    }

  };

  return (
    <main>

      <h1 className=" flex text-1xl font-bold ">Estes são os membros</h1>

      <p>
        <ul>
          {data.selectedObjects.map((item, index) => (

            <li key={index}>
              <div >{item.name} </div>

              <div> Criado em: {format(Date.parse(item.createdAt), 'dd/MM/yyyy')} </div>
            </li>

          ))}
        </ul>
      </p>

      <div>

        <h2 className=" my-2 text-1xl font-bold ">Lista de presença dos membros</h2>
        <form className=" my-2">
          <ul>
            {data.selectedObjects.map((item, index) => (
              <li key={index}>
                <label>
                  {item.name}
                  <input
                    class="appearance-none border-2  rounded mx-2 py-2 px-2 leading-tight checked:bg-gray-200"
                    type="checkbox"
                    value={item.name}
                    checked={selectedItems.includes(item)}
                    onChange={() => handleSelectItem(item)}
                  />
                </label>
              </li>
            ))}
          </ul>
          <p>Membros presentes: {selectedItems.join(', ')}</p>


          <button class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={registerAttendence} >Registrar Presença</button>
        </form>
      </div>

    </main>
  )
}


