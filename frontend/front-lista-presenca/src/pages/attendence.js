import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

// TODO: fazer a tela de registro de presenca
// TODO: criar todos os membros no backend


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



const registerAttendence = async() => {
  
  // const router = useRouter();

  // TODO fazer o resgistro de presenca funcinar atraves da ligacao com o backend

  console.log("increment like count")

  try {
    const response = await fetch('http://localhost:5000/api/attendences/register', {
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



export default function Attendence({ data }){

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
    <main
      className={`flex min-h-screen flex-col justify-between p-24 ${inter.className}`}>
      <h1>Estes são os membros</h1>
      <ul>
          {data.selectedObjects.map((item, index) => (
            
            <li key={index}>
              {item.name}, Criado em: {item.createdAt} 
            </li>
          
            
          ))}
      </ul>

      <div>

      <h2>Esta é a lista de presença dos membros</h2>
      <ul>
        {data.selectedObjects.map((item, index) => (
          <li key={index}>
            <label>
              {item.name}
              <input
                type="checkbox"
                value={item.name}
                checked={selectedItems.includes(item)}
                onChange={() => handleSelectItem(item)}
              />
            </label>
          </li>
        ))}
      </ul>
      <p>Selected Items: {selectedItems.join(', ')}</p>

      
    <button onClick={registerAttendence}>Registrar Presença</button>     
    </div>      
    
    </main>
  )
}


