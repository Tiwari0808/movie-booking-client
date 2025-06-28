import { FaArrowRight } from 'react-icons/fa'
import BlurCircle from './BlurCircle'
import { useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'
import { motion } from "framer-motion";

const FeaturedSection = () => {
    const navigate = useNavigate();
    return (
        <motion.div 
         initial={{opacity:0,y:40}}
         whileInView={{opacity:1,y:0}}
         transition={{duration:0.8}}


         className='flex flex-col px-[5vw] sm:px-[6vw] md:px-[6vw] lg:px-[10vw] overflow-hidden mt-[3vh] '>
            <motion.div className='flex items-center justify-between'>
                <h5 className='text-[#D1D5DC] font-bold text-[1.3rem] md:text-[1.8rem]'>Now Showing</h5>
                <motion.div className='flex items-center text-sm gap-2'>
                    <button className='cursor-pointer' onClick={() => navigate('/movies')}>View All </button>
                    <FaArrowRight className='' />
                </motion.div>
                <BlurCircle top='20' right={20} />
            </motion.div>
            <motion.div className='flex gap-5 flex-wrap justify-center md:justify-between mt-6'>
                {dummyShowsData.slice(0,6).map((show) => (
                    <MovieCard key={show.id} movie={show} />
                ))}
            </motion.div>

            <motion.div className='mt-10 flex justify-center'>
                <button onClick={()=>(navigate('/movies'))} className='w-[6rem] md:8rem bg-primary rounded-[6px] p-1.5 cursor-pointer'>Show More</button>
            </motion.div>

        </motion.div>
    )
}

export default FeaturedSection