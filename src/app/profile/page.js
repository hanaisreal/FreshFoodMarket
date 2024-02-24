'use client';

import { useSession } from 'next-auth/react';
import Image from "next/image";
import {redirect} from "next/navigation";

export default function ProfilePage() {
    const session = useSession();
    const {status} = session;

    if(status === 'loading'){
        return'로딩중...';
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
            <form className="max-w-xs mx-auto border">
                <div>
                    <Image src={userImage} alt={''} width={100} height={100} />
                </div>
            </form>
        </section>
        )
}