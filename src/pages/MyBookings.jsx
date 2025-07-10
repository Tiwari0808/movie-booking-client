import { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets';
import Spinner from '../components/Spinner';
import getHours from '../lib/getHours';
import dateFormat from '../lib/dateFormat';
import toast from 'react-hot-toast';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { span } from 'framer-motion/client';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBookings = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const bookings = snapshot.docs.map((doc) => ({
       id:doc.id,
       ...doc.data()
      }))
      setBookings(bookings);
      setIsLoading(false);
      toast.success('data fetched sucessfully')
    } catch (error) {
       toast.error(error.message)
    }
  }

  const payNowHandler = () => {
    return toast.success('Payment Successful');
  }

  useEffect(() => {
    getBookings()
  }, [])

  return !isLoading ? (
    <div className='px-3 md:px-[15vw] py-[15vh] gap-[3vh] flex flex-col'>
      <h2>My Bookings</h2>
      {bookings.map((item) => (
        <div key={item.id} className='flex justify-between max-w-[823px] max-h-[155px] bg-primary/15 p-3 rounded-[8px] border border-primary'>
          <img className='w-[160px] h-[135px] rounded-[8px] bg-cover bg-center' src={item.poster_path} alt="" />
          <div className='flex flex-col justify-between'>
            <h3 className='text-center text-[10px] font-bold  md:text-[18px]'>{item.movieName}</h3>
            <p className='text-center font-light leading-[117%] text-[12px] md:text-[14px] text-[#FFFFFFB2] opacity-[70%]'>{getHours(item.runtime)}</p>
            <p className='text-center font-bold text-[12px] md:text-[14px] align-middle text-[#FFFFFFB2] opacity-[70%]'>{`Price ₹${item.showPrice}`}</p>
          </div>
          <div className='flex flex-col justify-between items-center'>
            <div className='flex gap-2 flex-col items-center md:flex-row justify-between'>
              <p className='font-bold text-[10px] md:text-[22px] text-[#EBEBEB] '>{`Total: ₹${item.showPrice * item.selectedSeats.length }`}</p>
              {!item.isPaid && <button onClick={() => payNowHandler()} className='text-[10px] md:text-[16px] bg-primary justify-between px-[1vw] py-[0.5vh] rounded-full cursor-pointer'>Pay Now</button>}
            </div>
            <p className='text-center text-[10px] md:text-[16px]'>{`Total Tickets : ${item.selectedSeats.length}`}</p>
            <p className='text-center text-[10px] md:text-[16px]'>{`Seat Number : ${item.selectedSeats.join(", ")}`}</p>
          </div>
        </div>
      ))}
    </div>
   
  )
    : <Spinner />
}

export default MyBookings