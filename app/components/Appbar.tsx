"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession();

    return (
        <div className="flex justify-between items-center border-b">
            <div className=" m-3">
                Vibe
            </div>
            <div>
                {session.data?.user ? (
                    <button 
                    onClick={() => signOut()}
                    className="m-3 p-2 bg-blue-400"
                    >
                    Logout
                    </button>
                
                ) : (
                    <button 
                    onClick={() => signIn()}
                    className="m-3 p-2 bg-blue-400"
                    >
                    Sign in
                    </button>
                )}
                


            </div>
        </div>
    )
}