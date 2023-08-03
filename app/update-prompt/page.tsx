'use client'

import {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter, useSearchParams} from 'next/navigation'
import Form from '@components/Form'

export default function EditPrompt() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if(promptId) getPromptDetails()
    }, [promptId]);

    const editPrompt = async (e: any) => {
        e.preventDefault()
        setSubmitting(true)

        if(!promptId) return alert('Prompt ID not found')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
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
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />
    )
}
