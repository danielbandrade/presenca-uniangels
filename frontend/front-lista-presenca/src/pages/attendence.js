import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

// TODO: fazer a tela de registro de presenca
// TODO: criar todos os membros no backend




export default function Attendence({ data }){

    const router = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col justify-between p-24 ${inter.className}`}>
      <h1>Estes são os membros</h1>
      <ul>
          {data.selectedObjects.map((item, index) => (
            <li key={index}>Nome:{item.name}, Criado em: {item.createdAt} </li>
          ))}
        </ul>
    </main>
  )
}

  
export async function getServerSideProps() {
    
    const response = await fetch('http://localhost:5000/api/members/getmembers');
    const data = await response.json();

    return {
        props: {
            data,
          },
    };
}
