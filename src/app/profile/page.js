'use client';

import { useSession } from 'next-auth/react';
import Image from "next/image";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";

export default function ProfilePage() {
    const session = useSession();
    const {status} = session;
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if(session.data){
            setUserName(session.data.user.name);
        }
    }, [session, status]);

    

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        console.log('update profile info');
        await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName
            })

        })
    }

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
            <div className="max-w-md mx-auto ">
                <h2 className="text-center text-primary text-2xl mb-4">
                    profile saved!
                </h2>
                <div className='flex gap-4 items-center'>
                    <div>
                        <div className=' p-2 rounded-lg relative'>
                        <Image src={userImage} alt={'avatar'} className='rounded-lg w-full h-full mb-1'
                        width={250} height={250} priority/>
                        <button type='button' className='btn-primary'>변경</button>
                        </div> 
                    </div>
                    <form className='grow' onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder='이름' 
                        value={userName} onChange={ev => setUserName(ev.target.value)}/>
                        <input type="email" disabled={true} value={session.data.user.email}/>
                        <button type='submit' className='btn-primary'>저장</button>
                    </form>
                </div>
            </div>
        </section>
        )
}