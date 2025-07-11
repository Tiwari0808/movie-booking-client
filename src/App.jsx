import { Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Spinner from './components/Spinner'
const Home = lazy(() => import('./pages/Home'))
const Movies = lazy(() => import('./pages/Movies'))
const MovieDetails = lazy(() => import('./pages/MovieDetails'))
const SeatLayout = lazy(() => import('./pages/SeatLayout'))
const MyBookings = lazy(() => import('./pages/MyBookings'))
const Footer = lazy(() => import('./components/Footer'))
const TrailerSection = lazy(() => import('./components/TrailerSection'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Addshows = lazy(() => import('./pages/admin/Addshows'))
const ListBookings = lazy(() => import('./pages/admin/ListBookings'))
const ListShows = lazy(() => import('./pages/admin/ListShows'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const AdminLogin = lazy(() => import('./firebase/AdminLogin'))
const HeroSection = lazy(() => import('./components/HeroSection'))
const Navbar = lazy(() => import('./components/Navbar'))

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route path='/movies/:id/:date' element={<SeatLayout />} />
          <Route path='/myBookings' element={<MyBookings />} />
          <Route path='/trailers' element={<TrailerSection />} />
          <Route path='/hero' element={<HeroSection />} />
          <Route path='admin/*' element={<Layout />}>
            <Route path='login' element={<AdminLogin />} />
            <Route index path='dashboard' element={<Dashboard />} />
            <Route path='addShows' element={<Addshows />} />
            <Route path='listBookings' element={<ListBookings />} />
            <Route path='listShows' element={<ListShows />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App;
