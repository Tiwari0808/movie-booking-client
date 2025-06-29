import { useState } from 'react';
import ReactPlayer from 'react-player';
import { dummyTrailers } from '../assets/assets';
import { FaPlayCircle } from 'react-icons/fa';

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className='px-[5vw]  md:px-[10vw] mt-10'>
      <h2 className='font-bold text-[20px] sm:text-[16px]'>Trailers</h2>

      <div className='mt-10 w-full max-w-[900px] mx-auto flex items-center justify-center'>
        <ReactPlayer
          src={currentTrailer.videoUrl}
          controls
          width="100%"
          height='60vh'
        />
      </div>

      <div className='flex items-center justify-center gap-4 flex-wrap mt-6'>
        {dummyTrailers.map((item) => (
          <div
            key={item.image}
            className='relative cursor-pointer'
            onClick={() => setCurrentTrailer(item)}>
            <img
              className={`rounded-[16px] ${
                currentTrailer.image === item.image
                  ? 'border-2 border-blue-500'
                  : ''
              } w-24 sm:w-28 md:w-32`}
              src={item.image}
              alt=""
            />
            <FaPlayCircle className='absolute top-[32%] left-[40%] text-white text-2xl' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
