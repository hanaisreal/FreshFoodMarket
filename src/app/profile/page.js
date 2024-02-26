'use client';

import { set } from 'mongoose';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import InfoBox from '../../components/layout/InfoBox';
import SuccessBox from '../../components/layout/SuccessBox';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
    const session = useSession();
    const {status} = session;
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [poastalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    

    useEffect(() => {
        if(session.data){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [session, status]);

    

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        toast('Saving...');

        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    image: image,})
            });
            if(response.ok) 
                 resolve();
            else 
                reject();
        
         });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Saved!',
            error: 'Error!',
        });
    }

    async function handleFileChange(ev){
        const files = ev?.target.files;
        
        if(files?.length === 1){
            const data = new FormData;
            data.set('file', files[0]) //file이란 이름으로 post 요청을 보낸다.
            
            
            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                if(response.ok){
                    return response.json().then(link => {
                        setImage(link); 
                    })
                }
                throw new Error('Upload failed, something went wrong');
            });

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Uploaded!',
                error: 'Error!',
            });
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
                <div className='flex gap-4'>
                    <div>
                        <div className=' p-2 rounded-lg relative max-w-[120px]'>
                        {image &&
                            <Image src={image} alt={'avatar'} className='rounded-lg w-full h-full mb-1'
                            width={250} height={250} priority />
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
                        <input type="tel" placeholder='전화번호' 
                            value={phone} onChange={ev => setPhone(ev.target.value)}/>
                        <input type="text" placeholder='상세 주소'
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                        <div className='flex gap-4'>
                            <input type="text" placeholder='우편번호' 
                            value={poastalCode} onChange={ev => setPostalCode(ev.target.value)}/>
                            <input type="text" placeholder='시도'
                             value={city} onChange={ev => setCity(ev.target.value)} />
                        </div>
                        <input type="text" placeholder='국가' 
                         value={country} onChange={ev => setCountry(ev.target.value)}/>
                        <button type='submit' className='btn-primary'>저장</button>
                    </form>
                </div>
            </div>
        </section>
        )
    
}