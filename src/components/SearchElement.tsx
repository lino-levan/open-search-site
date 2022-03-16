import { useState } from "react";

export interface ISearch {
  href: string
  title: string
  description: string
  screenshot: string
}

function SearchElement({result}: {result: ISearch}) {
  const [hover, setHover] = useState(false)

  return (
    <div className="w-full p-2" key={result.href}>
      <div>
        <a href={result.href}>
          <div><p className='text-slate-400 hover:text-slate-700 inline'>{result.href}</p></div>
          <div><h2 onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} className='text-blue-500 text-xl hover:text-blue-800 inline'>{result.title}</h2></div>
        </a>
      </div>
      <div className={`absolute shadow fade transition-all pointer-events-none ${hover? 'opacity-100' : 'opacity-0'}`}>
        <img src={result.screenshot} width={192} height={108}></img>
      </div>
      <p className='text-slate-500'>{result.description || 'No Description Available'}</p>
    </div>
  )
}

export default SearchElement
