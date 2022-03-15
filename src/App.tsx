import { Route, Routes } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import Index from './pages'
import Search from './pages/search'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="search" element={<Search />} />
    </Routes>
  )
}

export default App
