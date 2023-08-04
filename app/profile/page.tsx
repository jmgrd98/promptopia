'use client'

import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Profile from '@components/Profile'

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

export default function MyProfile() {

    const {data: session} = useSession() as unknown as { data: Session | null };
    const router = useRouter()
    const [posts, setPosts] = useState<{ _id: string; }[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (session && session.user) {
                const res = await fetch(`/api/users/${session.user.id}/posts`);
                const data = await res.json();
                setPosts(data);
            }
        };

        if (session && session.user) fetchPosts();
    }, [session]);


    const handleEdit = (post: any) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post: any) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

        if(hasConfirmed) {
            try{
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE',
                })
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                console.log('ENTROOOU')
                setPosts(filteredPosts);
            } catch (error) {
                console.log('DEU RUIM')
                console.error(error)
            }
        }
    }


    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
