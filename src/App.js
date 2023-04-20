import { useState, useRef, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './contexts/DataContext';
import { SearchContext } from './contexts/SearchContext';
import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';

import { createResource as fetchData } from './helper';
import Spinner from './contexts/Spinner'

import './App.css';

function App() {

  let [message, setMessage] = useState('Search for Music!!');
  let [data, setData] = useState(null);
  let searchInput = useRef('')
  // ==================Need Corrections====================
  useEffect(() => {
    if (searchTerm) {
      setData (fetchData (serchTerm))
    }
  },[searchTerm])

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<h1>Loading ...</h1>}>
          <gallery data={data}/>
        </Suspense>
      )
    }
  }
  //=======================================================
  const handleSearch = async searchTerm => {
    if (!searchTerm) return
    document.title = `${searchTerm} Music`;
    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`);
    const resData = await response.json();
    if (resData.results.length) {
      setData(resData.results)
    } else {
      setData([]);
      setMessage("Nothing found for that artist")
    }
    console.log(resData)
  }

  return (
    <div className="App">

      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <SearchContext.Provider value={
                {
                  term: searchInput,
                  handleSearch
                }
              }>
                <SearchBar />
                <Suspense fallback = {<Spinner/>}>
                  <Gallery data ={data}/>
                </Suspense>
                
              </SearchContext.Provider>

              <DataContext.Provider value={
                {
                  data
                }
              }>
                <Gallery />
              </DataContext.Provider>
            </>
          } />
          <Route path='/album/:id' element={ <AlbumView/> } />
          <Route path='/artist/:id' element={ <ArtistView /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

