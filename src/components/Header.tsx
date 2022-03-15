import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function Header() {
  return (
    <div className='flex items-center p-5 shadow'>
      <Link to="/"><h1 className='schoolbell text-emerald-400 text-4xl mr-10'>OpenSearch</h1></Link>
      <SearchBar />
    </div>
  )
}

export default Header
