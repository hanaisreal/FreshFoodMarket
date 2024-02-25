'use client';

import { set } from 'mongoose';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";

export default function ProfilePage() {
    const session = useSession();
    const {status} = session;
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    

    useEffect(() => {
        if(session.data){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [session, status]);

    

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName
            })

        })
        setIsSaving(false);
        setSaved(true);
    }

    async function handleFileChange(ev){
        console.log(ev);
        const files = ev?.target.files;
        
        if(files?.length === 1){
            const data = new FormData;
            data.set('file', files[0]) //file이란 이름으로 post 요청을 보낸다.
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
            const link = await response.json();
            setImage(link);
        }
    }

    if(status === 'loading'){
        return'로딩중..';
    }
    if(status === 'unauthenticated'){
        return redirect('/login');
    }

    return (
        <section>
            <h1 className="text-center text-primary text-4xl mb-4">
                프로필
            </h1>
            <div className="max-w-md mx-auto ">
                {saved && 
                    <h2 className="text-center text-primary text-2xl mb-4">
                        profile saved!
                    </h2>}
                {isSaving &&
                    <h2 className="text-center text-primary text-2xl mb-4">
                        saving...
                    </h2>}
                <div className='flex gap-4 items-center'>
                    <div>
                        <div className=' p-2 rounded-lg relative'>
                        {image &&
                            <Image src={image} alt={'avatar'} className='rounded-lg w-full h-full mb-1'
                            width={250} height={250} priority unoptimized={true}/>
                        }
                        
                        <label>
                            <input type='file' className='hidden' onChange={handleFileChange}/>
                            <span className='block border rounded-lg p-2 text-center
                            cursor-pointer'>사진 변경</span>
                        </label>
                        
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