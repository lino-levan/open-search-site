import { useEffect, useState } from 'react';
import Header from '../components/Header'
import useQuery from '../lib/useQuery';

interface ISearch {
  href: string
  title: string
  description: string
}

function Search() {
  const [search, setSearch] = useState<ISearch[]>([])
  const query = useQuery()

  useEffect(()=>{
    fetch(`/.netlify/functions/search?q=${query.get("q")}`)
      .then((res)=>res.json())
      // .then(console.log)
      .then(setSearch)
  }, [])

  return (
    <>
      <Header/>
      <div className='flex justify-center p-4'>
        <div className='max-w-5xl w-full'>
          {
            search.map((result)=>(
              <div className="w-full" key={result.href}>
                <a href={result.href}>
                  <p className='text-slate-400'>{result.href}</p>
                  <h2 className='text-blue-500 text-xl'>{result.title}</h2>
                  <p className='text-slate-500'>{result.description}</p>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Search
