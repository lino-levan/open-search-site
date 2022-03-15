import SearchBar from '../components/SearchBar'

function Index() {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='max-w-5xl flex flex-col justify-center items-center'>
        <h1 className='schoolbell text-emerald-400 text-9xl pb-8'>OpenSearch</h1>
        <SearchBar />
      </div>
    </div>
  )
}

export default Index
