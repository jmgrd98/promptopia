'use client'

import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

interface PromptCardListProps {
    data: any,
    handleTagClick?: Function
}

function PromptCardList({data, handleTagClick}: PromptCardListProps) {

    if (!data) {
        return null;
    }

    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post: any) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}/>
            ))}
        </div>
    )
}

export default function Feed() {

    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleSearchChange = (e: any) => {
        setSearchText(e.target.value);
        console.log(searchText)
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt');
            const data = await res.json();
            setPosts(data);
            setFilteredPosts(data);
        }
        console.log(posts)
        console.log(filteredPosts)
        fetchPosts();
    }, []);

    useEffect(() => {
        const filtered = posts.filter((post: any) =>
            post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
            post.creator.username.toLowerCase().includes(searchText.toLowerCase()) ||
            post.creator.email.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPosts(filtered);
        console.log(filteredPosts)
    }, [searchText, posts]);


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
                data={filteredPosts}
                // handleTagClick={() => {}}
            />
        </section>
    )
}
