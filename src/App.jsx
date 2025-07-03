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
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Addshows from './pages/admin/Addshows'
import ListBookings from './pages/admin/ListBookings'
import ListShows from './pages/admin/ListShows'
import ErrorPage from './pages/ErrorPage'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/myBookings' element={<MyBookings />} />
        <Route path='/favorites' element={<Favorite />} />
        <Route path='/trailers' element={<TrailerSection />} />
        <Route path='admin/*' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='addShows' element={<Addshows />} />
          <Route path='listBookings' element={<ListBookings />} />
          <Route path='listShows' element={<ListShows />} />
        </Route>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App;
