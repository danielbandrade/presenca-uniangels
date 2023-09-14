import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import showMembers from '@/pages/showMembers';


export default function Home() {

const router = useRouter();

  return (
    <main className={``}>
      <h1>Bem vindo</h1>
      <showMembers/>
      <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/login')}>
      Clique aqui para ir para o login
      </button>
    </main>
  )
};
