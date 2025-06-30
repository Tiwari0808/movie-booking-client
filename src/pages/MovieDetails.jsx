import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyCastsData, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { FaPlay, FaStar } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import BlurCircle from '../components/BlurCircle';
import getHours from '../lib/getHours';
import CastImage from '../components/CastImage';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [show, setShow] = useState(null);
  const getDetails = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    setShow({ movie: show, dateTime: dummyDateTimeData });
  }

  useEffect(() => {
    getDetails()
  }, [id])




  return show ? (
    <div className='mt-[27vh] px-[3vw] md:px-[15vw] '>
      <div className='flex gap-[4vh] flex-col md:flex-row '>
        <img className='rounded-[18px] w-[278px] h-[417px]' src={show.movie.poster_path} alt="Movie poster" />
        <div className='flex flex-col gap-[2.5vh]'>
          <BlurCircle />
          <p className='font-bold text-primary'>ENGLISH</p>
          <h2 className='font-bold text-[36px] leading-[117%]'>{show.movie.title}</h2>
          <div className='flex gap-[0.5vw] items-center'>
            <FaStar className='text-primary' />
            <p className='font-semibold text-[#D1D5DC] '>{show.movie.vote_average.toFixed(2)} IMDb</p>
          </div>
          <p className='max-w-[599px] leading-[120%] align-middle text-[#99A1AF] text-[14px]'>{show.movie.overview}</p>
          <div className='max-w-[342px]'>
            <p className='text-[16px] text-[#D1D5DC] '>{`${getHours(show.movie.runtime)} • ${show.movie.genres.slice(0, 2).map((item) => item.name).join(" | ")} • ${show.movie.release_date.split(', ')}`}</p>
          </div>
          <div className='flex gap-[1vw] items-center'>
            <button onClick={() => navigate('/trailers')} className='flex items-center bg-[#1E2939] px-[1.5vw] py-[1.8vh] gap-[1vw] rounded-[6px] cursor-pointer'>
              <FaPlay />
              Watch Trailer
            </button>
            <button className='flex items-center bg-primary px-[1.5vw] py-[1.8vh] gap-[1vw] rounded-[6px] cursor-pointer'>
              Buy Tickets
            </button>
            <div >
              <CiHeart className='bg-[#364153] rounded-full w-[41px] h-[41px] p-2 text-[16px]' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex mt-[3vh] gap-[8vh] flex-wrap'>
        <h2 className=''>Your Fevorite Cast</h2>
        <div className='flex gap-[3vw] '>
          {dummyCastsData.slice(0, 6).map((item,index) => (
            <CastImage index={index} url={item.profile_path} name={item.name} />
          ))}
        </div>
      </div>
      <div className='bg-primary w-full h-[15vh] rounded-[12px] opacity-[10%] border-primary'>

      </div>
    </div>
  ) : <h2>Loading...</h2>
}

export default MovieDetails