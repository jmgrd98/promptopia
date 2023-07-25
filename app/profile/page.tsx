'use client'

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Profile from '@components/Profile'

export default function MyProfile() {

    const {data: session} = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await res.json()
          setPosts(data)
          console.log(data)
        }
    
        if(session?.user.id) fetchPosts()
      }, []);

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }


  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={[]}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}
