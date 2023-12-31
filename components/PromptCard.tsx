'use client'

import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter, usePathname} from 'next/navigation'
import Image from 'next/image'

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

export default function PromptCard({post, handleTagClick, handleEdit, handleDelete}: any) {

    const [copied, setCopied] = useState("")

    const {data: session} = useSession() as unknown as { data: Session | null };
    const pathName = usePathname()
    const router = useRouter()

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(""), 3000)
    }

    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                    <Image
                        src={post.creator?.image}
                        alt="user_image"
                        width={37}
                        height={37}
                        className='rounded-full object-contain'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator?.username}</h3>
                        <p className='font-intern text-sm text-gray-500'>{post.creator?.email}</p>
                    </div>
                </div>

                <div className='copy_btn' onClick={handleCopy}>
                    <Image src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                           alt="copy icon"
                           width={12}
                           height={12}
                    />
                </div>
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
            <p
                className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{post.tag}
            </p>

            {session?.user.id === post.creator._id && pathName === '/profile' &&  (
                <div className='flex justify-end items-center gap-5 mt-5'>
                    <button className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>Edit</button>
                    <button className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}
