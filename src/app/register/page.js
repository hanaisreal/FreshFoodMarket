'use client';
import Image from 'next/image';
import {signIn} from "next-auth/react";
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method: 'POST', 
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            setUserCreated(true);
          }
          else {
            setError(true);
          }
          setCreatingUser(false);
        
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                회원가입
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    회원가입이 완료 되었습니다.<br />
                    로그인하세요.{' '}
                    <Link className="underline" href={'/login'}>로그인 &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                An error has occurred.<br />
                Please try again later
                </div>
            )}
                        <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                            <input type="email" placeholder="이메일" value={email}
                                disabled={creatingUser} 
                                onChange={ev=> setEmail(ev.target.value)}/>
                            <input type="password" placeholder="비밀번호" value={password} 
                                disabled={creatingUser}
                                onChange={ev=> setPassword(ev.target.value)} />
                            <button type="submit" disabled={creatingUser}>
                                회원가입
                            </button>
                            
                            <div className="my-4 text-center text-gray-500"> 또는 간편하게 연결하기 </div>
                            <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                                className="flex gap-4 justify-center">
                                <Image src={'/google.png'} alt={''} width={24} height={24} />
                                Login with google
                            </button>
                                <div className="text-center my-4 text-gray-500 border-t pt-4">
                                이미 계정이 있으신가요?{' '}
                                <Link className="underline" href={'/login'}>여기로 로그인 &raquo;</Link>
                                </div>
                        </form>
            
        </section>
     )
}