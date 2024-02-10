"use client";
import Image from 'next/image';
import { useState } from 'react';
export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleFormSubmit(ev){
        ev.preventDefault();
        fetch('/api/register', {
            method: 'POST', 
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        })
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary font-semibold text-4xl mb-4">
                회원가입
            </h1>
                        <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
                            <input type="email" placeholder="이메일" value={email} onChange={ev=> setEmail(ev.target.value)}/>
                            <input type="password" placeholder="비밀번호" value={password} onChange={ev=> setPassword(ev.target.value)} />
                            <button type="submit">
                                회원가입
                            </button>
                            <div className="my-4 text-center text-gray-500"> or login with provider</div>
                            <button className='flex gap-4 justify-center'> 
                                <Image src={'/google.png'} width={25} height={25} alt={'Google'} />
                                Login with google</button>
                        </form>
            
        </section>
    )
}