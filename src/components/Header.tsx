import { Link, NavLink } from 'react-router-dom'
import useQuery from '../lib/useQuery'
import SearchBar from './SearchBar'

function Header() {
  const query = useQuery()

  return (
    <>
      <div className='flex items-center p-5 shadow'>
        <Link to="/"><h1 className='schoolbell text-emerald-400 text-4xl mr-10'>OpenSearch</h1></Link>
        <SearchBar />
      </div>
      <div className='flex justify-center'>
        <div className=' flex items-start p-2 max-w-3xl w-full'>
          <NavLink to={`/search?q=${query.get('q')}`} className={isActive => "p-2" + (isActive ? " text-blue-500" : "")}>All</NavLink>
          <NavLink to={`/images?q=${query.get('q')}`} className={isActive => "p-2" + (isActive ? " text-blue-500" : "")}>Images</NavLink>
        </div>
      </div>
    </>
  )
}

export default Header
