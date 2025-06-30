import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'

const Movies = () => {
  return dummyShowsData.length > 0 ? (
      <div className='flex flex-col gap-[3vh] px-[4vw] my-[20vh]'>
        <h1 className='font-bold text-[20px] sm:text-[16px]'>Movies</h1>
        <BlurCircle top={0} right={0}/>
        <div className='flex gap-3 flex-wrap justify-center'>
          {dummyShowsData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <BlurCircle bottom={0} left={0}/>
      </div>) : <div className='flex gap-[3vh] px-[4vw] my-[20vh] justify-center'><h1 className='font-bold text-[20px] sm:text-[16px]'>No Movies to display</h1></div>
}

export default Movies