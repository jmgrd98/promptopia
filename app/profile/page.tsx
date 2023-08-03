'use client'

import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Profile from '@components/Profile'

export default function MyProfile() {

    const {data: session} = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session.user.id}/posts`)
            const data = await res.json()
            setPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

        if(hasConfirmed) {
            try{
                await fetch(`/api/posts/${post._id}`, {
                    method: 'DELETE',
                })
                const filteredPosts = posts.filter((p) => p._id !== p._id)
                setPosts(filteredPosts);
            } catch (error) {
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
