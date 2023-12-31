'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion} from 'next-auth/react'
import {BuiltInProviderType} from "@node_modules/next-auth/providers";

interface User {
    name?: string;
    email?: string;
    image?: string;
    id: string;
}

interface Session {
    expires: string;
    user: User;
}

export default function Nav() {

    const {data: session} = useSession() as unknown as { data: Session | null };

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        fetchProviders()
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image src='/assets/images/logo.svg' width={30} height={30} alt='Promptopia Logo'
                       className='object-contain'/>
                <p className='logo_text'>Promptopia</p>
            </Link>

            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-prompt' className='black_btn'>Create Post</Link>
                        <button type='button' className='outline_btn' onClick={() => signOut()}>Sign Out</button>


                        <Link href='/profile'>
                            <Image
                                src={session.user.image || '../public/assets/icons/default-profile.png'}
                                width={37}
                                height={37}
                                alt='Profile image'
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider: any) => (
                            <button type='button' key={provider.name} onClick={() => signIn(provider.id)}
                                    className='black_btn'>Sign In</button>
                        ))}
                    </>
                )}
            </div>

            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session.user.image || '../public/assets/icons/default-profile.png'}
                            width={37}
                            height={37}
                            alt='Profile image'
                            className='rounded-full'
                            onClick={() => setToggleDropdown((prevState) => (!prevState))}
                        />

                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button type='button' onClick={() => {
                                    setToggleDropdown(false)
                                    signOut()
                                }}
                                        className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider: any) => (
                            <button type='button' key={provider.name} onClick={() => signIn(provider.id)}
                                    className='black_btn'>Sign In</button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}
