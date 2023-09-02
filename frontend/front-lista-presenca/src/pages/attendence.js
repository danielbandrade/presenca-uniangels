import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

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



const registerAttendence = () => {
  
  // TODO preciso capturar os dados inseridos na interface e enviar da maneira adequada para o backend
  // posso começar garantindo que os dados estão chegando na função 

  


  /*
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
        const response = await fetch('http://localhost:5000/api/attendences/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          // Handle successful login response here
          router.push('/attendence');
        } else {
          // Handle login error response here
          console.log('Login failed!');
        }
      } catch (error) {
        // Handle error here
        console.error('Error:', error);
      }
      */

  };




export default function Attendence({ data }){

    const router = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col justify-between p-24 ${inter.className}`}>
      <h1>Estes são os membros</h1>
      <ul>
          {data.selectedObjects.map((item, index) => (
            
            <li key={index}>
              Nome:{item.name}, Criado em: {item.createdAt} 
            </li>
          
            
          ))}
      </ul>

      <div>


      <h2>Multi-Select List</h2>
      <ul>
        {data.selectedObjects.map((item, index) => (
          <li key={index}>
            <label>
              {item.name}
              <input
                type="checkbox"
                value={item}
              />
            </label>
          </li>
        ))}
      </ul>
      <p>Selected Items: </p>
    </div>      



    </main>
  )
}


