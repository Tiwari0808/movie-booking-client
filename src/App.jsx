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
import AdminLogin from './firebase/AdminLogin'
import ProtectedRoutes from './components/admin/ProtectedRoutes'
import HeroSection from './components/HeroSection'

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
        <Route path='/hero' element={<HeroSection />} />
        <Route path='admin/*' element={<Layout />}>
          <Route index element={<AdminLogin />} />
          <Route path='dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route path='addShows' element={<ProtectedRoutes><Addshows /></ProtectedRoutes>} />
          <Route path='listBookings' element={<ProtectedRoutes><ListBookings /></ProtectedRoutes>} />
          <Route path='listShows' element={<ProtectedRoutes><ListShows /></ProtectedRoutes>} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App;
