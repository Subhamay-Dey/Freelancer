"use client"

import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function SearchInput() {

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if(search.length > 0) {
      router.replace(`/search?q=${search}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className='relative'>
            <input
                className='w-full h-12 p-2 outline-none border bg-muted rounded-xl pl-10'
                placeholder='Type here...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Search className='absolute left-2 top-3 text-gray-400'/>
        </div>
    </form>
  )
}

export default SearchInput