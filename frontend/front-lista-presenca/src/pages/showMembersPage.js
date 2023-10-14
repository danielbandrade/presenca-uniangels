import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ShowMembers from '@/components/ShowMembersComponent';
import HeaderApp from '@/components/HeaderApp';


// TODO outra forma de fazer o header: https://medium.com/@ryaddev/creating-a-responsive-navbar-with-react-and-tailwind-css-502cceaf9f53

export default function showMembersPage() {

  const router = useRouter();

  return (
    <main>
        <div>
           <HeaderApp/>
        </div>
        <div className="bg-primary w-full overflow-hidden">
          <div className={`sm:px-16 px-6 flex justify-center items-center`}>
            <div className={`xl:max-w-[1280px] w-full`}>
             <ShowMembers/>
              <button className='my-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full' onClick={() => router.push('/')}>
              Clique aqui para voltar ao inicio
              </button>
            </div>
          </div>
      </div>

    </main>
  )
};
