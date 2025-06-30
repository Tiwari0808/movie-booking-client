import { useState } from 'react'
import { CiClock1 } from 'react-icons/ci'
import { assets } from '../assets/assets';

const SeatLayout = () => {
  const [isSelected,setIsSelected] = useState(null);
  return (
    <div className='px-[119px] py-[181px] flex gap-10 '>
      <div className='relative w-[222px] h-[313px] flex-wrap bg-primary/15 rounded-[12px] border border-primary flex flex-col gap-3'>
        <div className='px-5 py-5'>
          <h2>Available Timings</h2>
        </div>
        <div className='flex gap-1 items-center bg-primary rounded-r-[8px] p-1 w-[50%] '>
          <CiClock1 />
          <p>9:30 pm</p>
        </div>
      </div>
      <div className='w-full flex flex-col gap-7'>
        <div className='flex justify-center w-full'>
          <h2>Select Your Seat</h2>
        </div>
        <div className='flex items-center justify-center'>
          <img src={assets.screenImage} alt="Screen Image" />
        </div>
        <h2 className='w-full text-center'>Screen Side</h2>
      </div>
    </div>

  )
}

export default SeatLayout