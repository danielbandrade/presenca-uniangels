import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import ShowMembers from '@/components/ShowMembersComponent';


export default function showMembersPage() {

const router = useRouter();

  return (
    <main className={'h1'}>
      <ShowMembers/>
      <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/')}>
        Clique aqui para voltar ao inicio
      </button>
    </main>
  )
};
