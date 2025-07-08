import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyCastsData, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { FaArrowRight, FaPlay, FaStar } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import BlurCircle from '../components/BlurCircle';
import getHours from '../lib/getHours';
import CastImage from '../components/CastImage';
import MovieCard from '../components/MovieCard';
import BookingUi from '../components/BookingUi';
import Spinner from '../components/Spinner'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import toast from 'react-hot-toast';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [show, setShow] = useState(null);
  const [allMovies,setAllMovies] = useState([]);
  const getDetails = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'movies'));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log(data);
      const show = data.find((show) => show.id === id);
      console.log(show);
      
      setShow({ movie: show, dateTime: dummyDateTimeData });
      setAllMovies(data);
      toast.success('data fetched successfully');
    } catch (error) {
       toast.error(error.message);
    }
  }

  useEffect(() => {
    getDetails()
  }, [id])

  return show ? (
    <div className='mt-[27vh] px-[3vw] md:px-[15vw] flex flex-col gap-[7vh]'>

      {/* movie details div */}

      <div className='flex gap-[4vh] flex-col md:flex-row items-center '>
        <img className='rounded-[18px] w-[278px] h-[417px]' src={show.movie.poster_path} alt="Movie poster" />
        <div className='flex flex-col gap-[2.5vh]'>
          <BlurCircle />
          <p className='font-bold text-primary'>ENGLISH</p>
          <h2 className='font-bold text-[36px] leading-[117%]'>{show.movie.title}</h2>
          <div className='flex gap-[0.5vw] items-center'>
            <FaStar className='text-primary' />
            <p className='font-semibold text-[#D1D5DC] '>{show.movie.vote_average} IMDb</p>
          </div>
          <p className='max-w-[599px] leading-[120%] align-middle text-[#99A1AF] text-[14px]'>{show.movie.overview}</p>
          <div className='max-w-[342px]'>
            <p className='text-[16px] text-[#D1D5DC] '>{`${getHours(show.movie.runtime)} • ${''} • ${''}`}</p>
          </div>
          <div className='flex gap-[1vw] items-center'>
            <button onClick={() => navigate('/trailers')} className='flex items-center bg-[#1E2939] px-[1.5vw] py-[1.8vh] gap-[1vw] rounded-[6px] cursor-pointer'>
              <FaPlay />
              Watch Trailer
            </button>
            <a href='#bookingUI' className='flex items-center bg-primary px-[1.5vw] py-[1.8vh] gap-[1vw] rounded-[6px] cursor-pointer'>
              Buy Tickets
            </a>
            <div >
              <CiHeart className='bg-[#364153] rounded-full w-[41px] h-[41px] p-2 text-[16px]' />
            </div>
          </div>
        </div>
      </div>

      {/* cast data div */}

      <div className='flex mt-[3vh] mb-[3vh] gap-[8vh] w-full flex-col'>
        <h2 className=''>Your Fevorite Cast</h2>
        <div className='flex gap-[3vw] flex-wrap justify-evenly'>
          {dummyCastsData.slice(5,9).map((item, index) => (
            <div key={index}>
              <CastImage url={item.profile_path} name={item.name} />
            </div>
          ))}
        </div>
      </div>

      {/* booking ticket ui with date */}

      <BookingUi show={show} id={id} />

      {/* see more div */}

      <div className=' py-3 flex flex-col gap-5'>
        <div className='flex justify-between'>
          <h2>You may also like</h2>
          <div onClick={() => (navigate('/movies'), scrollTo({ top: 0, behavior: 'smooth' }))} className='flex justify-between items-center gap-1 font-extralight cursor-pointer'>
            <p>see more</p>
            <FaArrowRight className='font-extralight text-primary' />
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 md:flex-row flex-wrap'>
          {allMovies.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
        <div className='flex justify-center'>
          <button onClick={() => ((navigate('/movies')), scrollTo(0, 0))} className='w-[6rem] md:8rem bg-primary rounded-[6px] p-1.5 cursor-pointer text-center flex justify-center'>Show More</button>
        </div>
      </div>

    </div>
  ) :
    <Spinner />
}

export default MovieDetails;