'use client';
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session?.status;

  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  if(userName && userName.includes(' ')){
    userName = userName.split(' ')[0];
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold 2xl" href="/">
            맛난이 농산물
          </Link>
          <Link href={''}>Home</Link>
          <Link href={''}>Menu</Link> 
          <Link href={''}>About</Link>
          <Link href={''}>Contact</Link>
          
        </nav> 
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {status === "authenticated" && (
            <>
            <Link href="/profile" className="whitespace-nowrap">{userName}</Link>
            <button 
              onClick={()=> signOut()} 
              className="bg-primary rounded-full text-white px-8 py-2">
              로그아웃
            </button>
            </>
            
          )}
          {status !== "authenticated" && (
            <>
              <Link href="/login"> 로그인</Link>
              <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
                회원가입
              </Link>
            </>
          )}
          </nav>
      </header>
    </div>
  )
}
