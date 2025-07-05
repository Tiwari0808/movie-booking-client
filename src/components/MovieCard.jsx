import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import getHours from '../lib/getHours';
import { motion } from 'framer-motion';


const MovieCard = ({movie}) => {
    const navigate = useNavigate();
    return (
        <motion.div
        initial={{opacity:0,y:30}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.6}}
        className='relative p-3 max-w-[268px] max-h-[356px] bg-[#12161C] rounded-[16px] flex flex-col gap-[1rem]'>
            <img onClick={()=>(navigate(`/movies/${movie.id}`),scrollTo(0,0))} className='bg-cover bg-center rounded-[6px] h-[161px] cursor-pointer' src={movie.backdrop_path} alt="movie" />
            <p className='h-[38px] font-[Heebo] font-bold leading-[117%] align-middle'>{movie.title}</p>
            <div><p className='font-[Heebo] text-[14px] font-semibold text-[#797B7D] align-middle'>{`${new Date(movie.release_date).getUTCFullYear()} - ${movie.genres.slice(0,2).map(genre=>genre.name).join(" | ")} - ${getHours(movie.runtime)}`}</p></div>
            <div className='flex items-center justify-between mt-5'>
                <button onClick={()=>(navigate(`/movies/${movie.id}`),scrollTo(0,0))} className='w-[6rem] bg-primary rounded-full p-1.5 cursor-pointer'>Buy Ticket</button>
                <div className='flex gap-2 items-center'>
                    <FaStar className='text-primary w-[18px] h-[18px]' />
                    <p className='text-[#797B7D] text-[16px]'>{movie.vote_average.toFixed(1)}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default MovieCard