import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import ShowMembers from '@/components/ShowMembersComponent';


export default function showMembersPage() {

const router = useRouter();

  return (
    <main className={'h1'}>
      <ShowMembers/>
    </main>
  )
};
