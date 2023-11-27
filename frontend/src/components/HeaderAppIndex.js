import React, { useState } from 'react';
import { HandRaisedIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';

const HeaderAppIndex = () => {
    
    let Links =[
        {name:"SHOW MEMBERS",link:"/showMembersPage"},
        {name:"SHOW RECORDS",link:"/showAttendencePercent"},
      ];
    let [open, setOpen] = useState(false);

    const router = useRouter(); 

    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
           <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
            {/* logo section */}
            <div className='font-bold text-2xl cursor-pointer flex items-center gap-1' href='/'>
                <HandRaisedIcon className='w-7 h-7 text-red-700'/>
                <span>UniAngels Attendence</span>
            </div>
            {/* Menu icon */}
            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <XMarkIcon/> : <Bars3BottomRightIcon />
                }
            </div>
            {/* linke items */}
           </div>
        </div>
    );
};

export default HeaderAppIndex;