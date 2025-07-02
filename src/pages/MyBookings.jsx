import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets';
import Spinner from '../components/Spinner';
import getHours from '../lib/getHours';
import dateFormat from '../lib/dateFormat';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBookings = async () => {
    setBookings(dummyBookingData);
    bookings && setIsLoading(false)
  }

  useEffect(() => {
    getBookings()
  }, [])

  return !isLoading ? (
    <div className='px-1 md:px-[15vw] py-[15vh] gap-[3vh] flex flex-col'>
      <h2>My Bookings</h2>
      {bookings.map((item,index) => (
        <div key={index} className='flex justify-between max-w-[823px] max-h-[155px] bg-primary/15 p-3 rounded-[8px] border border-primary'>
          <img className='w-[160px] h-[135px] rounded-[8px] bg-cover bg-center' src={item.show.movie.poster_path} alt="" />
          <div className='flex flex-col justify-between'>
            <h3 className='text-center font-bold  md:text-[18px]'>{item.show.movie.title}</h3>
            <p className='text-center font-light leading-[117%] text-[12px] md:text-[14px] text-[#FFFFFFB2] opacity-[70%]'>{getHours(item.show.movie.runtime)}</p>
            <p className='text-center font-bold text-[12px] md:text-[14px] align-middle text-[#FFFFFFB2] opacity-[70%]'>{dateFormat(item.show.showDateTime)}</p>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <div className='flex gap-2 flex-col items-center md:flex-row justify-between'>
              <p className='font-bold md:text-[22px] text-[#EBEBEB] '>{`₹${item.show.showPrice}`}</p>
              {!item.isPaid && <button className='text-[1rem] bg-primary justify-between px-[1vw] py-[0.5vh] rounded-full cursor-pointer'>Pay Now</button>}
            </div>
            <p className='text-center text-[12px]'>{`Total Tickets : ${item.bookedSeats.length}`}</p>
            <p className='text-center text-[12px]'>{`Seat Number : ${item.bookedSeats.join(", ")}`}</p>
          </div>
        </div>
      ))}
    </div>
  )
    : <Spinner />
}

export default MyBookings