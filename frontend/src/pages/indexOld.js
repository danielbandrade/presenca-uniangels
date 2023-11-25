import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import ShowMembers from '@/components/ShowMembersComponent';
import HeaderApp from '@/components/HeaderApp';


export default function Home() {

const router = useRouter();

  return (
    <main className={'h1'}>
      <div>
          <HeaderApp/>
      </div>
      <h1>Bem vindo</h1>
    </main>
  )
};
