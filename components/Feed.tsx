'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

function PromptCardList({data, handleTagClick}: any) {

  if (!data) {
    return null;
  }

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: any) => (
        <PromptCard
        post={post}
        key={post._id}
        handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

export default function Feed() {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPosts(data)
      console.log(data)
    }

    fetchPosts()
  }, []);


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type="text"
        placeholder='Search for prompts, tags or username...'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      <PromptCardList
      data={posts}
      handleTagClick={() => {}}
      />
    </section>
  )
}
