import { useEffect, useState } from 'react';
import Header from '../components/Header'
import SearchElement, { ISearch } from '../components/SearchElement';
import useQuery from '../lib/useQuery';

function Search() {
  const [search, setSearch] = useState<ISearch[]>([])
  const query = useQuery()

  useEffect(()=>{
    fetch(`/.netlify/functions/search?q=${query.get("q")}`)
      .then((res)=>res.json())
      .then(setSearch)
      .catch(console.log)
  }, [])

  return (
    <>
      <Header/>
      <div className='flex justify-center p-4'>
        <div className='max-w-3xl w-full'>
          {
            search.map((result)=>(
              <SearchElement result={result}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Search
