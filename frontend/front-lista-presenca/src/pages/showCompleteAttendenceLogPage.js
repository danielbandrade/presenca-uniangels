import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import ShowCompleteAttendenceLog from '@/components/ShowCompleteAttendenceLog'


function showCompleteAttendenceLogPage() {

    const router = useRouter();

    return (
        <main className={'h1'}>
        <ShowCompleteAttendenceLog/>
        </main>
    )
};

export default showCompleteAttendenceLogPage;