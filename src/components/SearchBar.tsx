import { useState } from 'react'
import useQuery from '../lib/useQuery'

function SearchBar() {
  const query = useQuery()

  return (
    <div className="max-w-5xl">
      <input className="w-96 px-3 py-2 rounded shadow" placeholder='Search Here!' defaultValue={query.get('q') || ''} onKeyDown={(e)=>{
        if(e.key === "Enter"){
          let input = e.target as HTMLInputElement

          if(input.value.length > 0) {
            window.location.href = `/search?q=${encodeURIComponent(input.value)}`
          }
        }
      }}/>
    </div>
  )
}

export default SearchBar