import { FaArrowRight } from 'react-icons/fa'
import BlurCircle from './BlurCircle'
import { useNavigate } from 'react-router-dom'
import MovieCard from './MovieCard'
import { motion } from "framer-motion";
import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import toast from 'react-hot-toast'


const FeaturedSection = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getMovies = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'movies'));
            const movies = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMovies(movies);
            setIsLoading(false);
            toast.success('Data fetched successfully');
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getMovies();
    }, [])

    return !isLoading ? (
        <motion.div
            className='flex flex-col px-[5vw] sm:px-[6vw] md:px-[6vw] lg:px-[10vw] overflow-hidden mt-[3vh]'>
            <motion.div className='flex items-center justify-between'>
                <h5 className='text-[#D1D5DC] font-bold text-[1.3rem] md:text-[1.8rem]'>Now Showing</h5>
                <motion.div className='flex items-center text-sm gap-2'>
                    <button className='cursor-pointer' onClick={() => navigate('/movies')}>View All </button>
                    <FaArrowRight className='' />
                </motion.div>
                <BlurCircle top='20' right={20} />
            </motion.div>
            <motion.div className='flex gap-5 flex-wrap justify-center md:justify-between mt-6'>
                {movies.slice(0, 6).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </motion.div>

            <motion.div className='mt-10 flex justify-center'>
                <button onClick={() => (navigate('/movies'), scrollTo(0, 0))} className='w-[6rem] md:8rem bg-primary rounded-[6px] p-1.5 cursor-pointer'>Show More</button>
            </motion.div>

        </motion.div>
    ) : <Spinner />
}

export default FeaturedSection;