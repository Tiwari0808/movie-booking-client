import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import toast from 'react-hot-toast'


const Movies = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getShows = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'movies'));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setShows(data);
      setIsLoading(false);
      toast.success('Data fetched successfully')
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getShows()
  }, []);
  return !isLoading ? (
    <div className='flex flex-col gap-[3vh] px-[4vw] my-[20vh]'>
      <h1 className='font-bold text-[20px] sm:text-[16px]'>Movies</h1>
      <BlurCircle top={0} right={0} />
      <div className='flex gap-3 flex-wrap justify-center'>
        {shows.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <BlurCircle bottom={0} left={0} />
    </div>) : <div className='flex gap-[3vh] px-[4vw] my-[20vh] justify-center'><h1 className='font-bold text-[20px] sm:text-[16px]'>No Movies to display</h1></div>
}

export default Movies