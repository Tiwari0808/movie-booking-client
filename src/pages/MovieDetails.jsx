import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets';
import { FaStar } from 'react-icons/fa';

const MovieDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [show, setShow] = useState(null);
  const getDetails = async () => {
    const show1 = dummyShowsData.find((show) => show._id === id);
    console.log(show1);
  }


  return (
    <div className='mt-[27vh] px-[20vw]'>
      <div className='flex gap-4'>
        <img className='rounded-[18px] w-[278px] h-[417px]' src="https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg" alt="Movie poster" />
        <div>
          <p className='font-bold text-primary'>ENGLISH</p>
          <h2 className='font-bold text-[36px] leading-[117%]'>Guardians <br />
            of the Galaxy</h2>
            <div className='flex gap-[0.5vw] items-center'>
              <FaStar className='text-primary'/>
              <p className='font-semibold text-[#D1D5DC] '>4.5 IMDb</p>
            </div>
            <p className='max-w-[599px] leading-[100%] align-middle text-[#99A1AF] text-[14px]'>From the Marvel Cinematic Universe comes an epic space adventure. Peter Quill, a brash space adventurer who calls himself Star-Lord, finds himself the target of relentless bounty hunters after stealing a mysterious orb. To evade capture, he forms an uneasy alliance with a group of misfits: Gamora, Drax the Destroyer, Rocket Raccoon, and Groot.</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails