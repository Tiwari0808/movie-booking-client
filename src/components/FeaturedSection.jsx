import { FaArrowRight } from 'react-icons/fa'
import BlurCircle from './BlurCircle'
import { useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'

const FeaturedSection = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col px-[119px] overflow-hidden mt-25 '>
            <div className='flex items-center justify-between'>
                <h5 className='text-[#D1D5DC] font-bold text-5'>Now Showing</h5>
                <div className='flex items-center gap-2'>
                    <button className='cursor-pointer' onClick={() => navigate('/movies')}>View All </button>
                    <FaArrowRight className='' />
                </div>
                <BlurCircle top='20' right={20} />
            </div>
            <div className='flex gap-5 flex-wrap justify-between mt-10'>
                {dummyShowsData.map((show) => (
                    <MovieCard key={show.id} movie={show} />
                ))}
            </div>

            <div className='mt-10 flex justify-center'>
                <button onClick={()=>(navigate('/movies'))} className='w-[6rem] bg-primary rounded-[6px] p-1.5 cursor-pointer'>Show More</button>
            </div>

        </div>
    )
}

export default FeaturedSection