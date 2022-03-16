import { useEffect, useState } from 'react';
import Header from '../components/Header'
import ImageElement, { IImage } from '../components/ImageElement';
import useQuery from '../lib/useQuery';

function Images() {
  const [search, setSearch] = useState<IImage[]>([])
  const query = useQuery()

  useEffect(()=>{
    fetch(`/.netlify/functions/images?q=${query.get("q")}`)
      .then((res)=>res.json())
      .then(setSearch)
      .catch(console.log)
  }, [])

  return (
    <>
      <Header/>
      <div className='flex justify-center p-4'>
        <div className='w-full flex flex-wrap justify-start'>
          {
            search.map((result)=>(
              <ImageElement result={result}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Images
