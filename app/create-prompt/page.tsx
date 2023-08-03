'use client'

import {useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Form from '@components/Form'

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

export default function CreatePrompt() {

    const {data: session} = useSession() as unknown as { data: Session | null };

    const router = useRouter()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e: any) => {
        e.preventDefault()
        setSubmitting(true)

        try {
          const response = await fetch('/api/prompt/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: post.prompt,
              userId: session?.user?.id,
              tag: post.tag,
            }),
          })

          if(response.ok) {
            router.push('/')
          }
        } catch (error) {
          console.error(error)
        } finally {
          setSubmitting(false)
        }
    }

  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}
