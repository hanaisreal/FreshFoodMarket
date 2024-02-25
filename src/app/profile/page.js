'use client';

import { useSession } from 'next-auth/react';
import Image from "next/image";
import {redirect} from "next/navigation";
import {useState} from "react";

export default function ProfilePage() {
    const session = useSession();
    const {status} = session;
    const [userName, setUserName] = useState(session?.data?.user?.name || '' );

    if(status === 'loading'){
        return'로딩중..';
    }
    if(status === 'unauthenticated'){
        return redirect('/login');
    }

    const userImage = session.data.user.image;

    return (
        <section>
            <h1 className="text-center text-primary text-4xl mb-4">
                프로필
            </h1>
            <form className="max-w-md mx-auto ">
                <div className='flex gap-4 items-center'>
                    <div>
                        <div className=' p-2 rounded-lg relative'>
                        <Image src={userImage} alt={'avatar'} className='rounded-lg w-full h-full mb-1'
                        width={250} height={250}/>
                        <button type='button' className='btn-primary'>변경</button>
                        </div> 
                    </div>
                    <div className='grow'>
                        <input type="text" placeholder='이름' 
                        value={userName} onChange={ev => setUserName(ev.target.value)}/>
                        <input type="email" disabled={true} value={session.data.user.email}/>
                        <button type='submit' className='btn-primary'>저장</button>
                    </div>
                </div>
            </form>
        </section>
        )
}