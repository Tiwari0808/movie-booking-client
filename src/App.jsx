import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import Favorite from './pages/Favorite'
import TrailerSection from './components/TrailerSection'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
      <Toaster/>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/myBookings' element={<MyBookings />} />
        <Route path='/favorites' element={<Favorite/>} />
        <Route path='/trailers' element={<TrailerSection/>} />
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App;
