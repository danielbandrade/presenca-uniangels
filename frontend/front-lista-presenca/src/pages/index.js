import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import ShowMembers from '@/components/ShowMembersComponent';


export default function Home() {

const router = useRouter();

  return (
    <main className={'h1'}>
      <h1>Bem vindo</h1>
      <ul>
      <li>
        <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/login')}>
        Clique aqui para ir para o login
        </button>
      </li>
      <li>
        <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/registerAttendence')}>
        Clique aqui para registrar presença
        </button>
      </li>
      <li>
        <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/showMembersPage')}>
        Clique aqui para ver membros
        </button>
      </li>
      <li>
        <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/showAttendencePercent')}>
        Clique aqui para ver presenças
        </button>
      </li>
      </ul>
    </main>
  )
};
