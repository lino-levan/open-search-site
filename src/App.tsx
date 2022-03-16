import { Route, Routes } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import Index from './pages'
import Images from './pages/images'
import Search from './pages/search'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="search" element={<Search />} />
      <Route path="images" element={<Images />} />
    </Routes>
  )
}

export default App
