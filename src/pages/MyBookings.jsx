import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import getHours from '../lib/getHours';
import toast from 'react-hot-toast';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { MdDelete } from "react-icons/md";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBookings = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setBookings(bookings);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteHandler = async (bookingId, movieId, selectedSeats, selectedTime) => {
    try {
      // Delete the booking
      await deleteDoc(doc(db, 'bookings', bookingId));

      // Get all shows and find the one that matches movieId
      const snapshot = await getDocs(collection(db, 'shows'));
      const shows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const show = shows.find((s) => s.movieId === movieId);
      if (!show) return toast.error('Show not found');

      // Clone and modify the occupiedSeats for selectedTime
      const updatedSeats = { ...(show.occupiedSeats?.[selectedTime] || {}) };
      selectedSeats.forEach((s) => delete updatedSeats[s]);

      // Update the show doc with modified seats
      const showRef = doc(db, 'shows', show.id);
      await updateDoc(showRef, {
        [`occupiedSeats.${selectedTime}`]: updatedSeats
      });

      // Update local state and show success
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      toast.success('Booking deleted');
    } catch (error) {
      toast.error(error.message);
    }
  };


const payNowHandler = async (booking) => {
  try {
    const bookingRef = doc(db, 'bookings', booking.id);
    await updateDoc(bookingRef, { isPaid: true });
    toast.success("Payment Successful.Refresh to update.");
  } catch (error) {
    toast.error("Failed to complete payment or send email.");
  }
};

  useEffect(() => {
    getBookings();
  }, [])

  return !isLoading && bookings.length !== 0 ? (
    <div className='px-3 md:px-[15vw] py-[15vh] gap-[3vh] flex flex-col'>
      <h2>My Bookings</h2>
      {bookings.map((item) => (

        <div key={item.id} className='flex max-w-[623px]  bg-primary/15 p-3 rounded-[8px] border border-primary'>
          <img className='w-[160px] h-[135px] rounded-[8px] bg-cover bg-center' src={item.poster_path} alt="" />
          <div className='flex flex-col ml-3 w-full'>
            <div className='flex items-center relative justify-between gap-1 w-full'>
              <h3 className='text-[10px] font-bold  md:text-[14px]'>{ }{`${item.movieName} (${getHours(item.runtime)})`}</h3>
              <MdDelete onClick={() => deleteHandler(item.id, item.movieId, item.selectedSeats, item.selectedTime)} className='hover:text-primary cursor-pointer' />
            </div>
            <div className='flex flex-col gap-2 md:gap-2'>
              <p className=' font-light leading-[117%] text-[10px] md:text-[14px] text-[#FFFFFFB2] opacity-[70%]'>{`Name: ${item.name}`}</p>
              <p className=' text-[10px] md:text-[13px]'>{`On: ${item.selectedTime.split('T')[0]} At: ${item.selectedTime.split('T')[1]}`}</p>
              <p className=' text-[10px] md:text-[13px]'>{`Price: ₹${item.showPrice}`}</p>
              <p className=' text-[10px] md:text-[13px]'>{`Total Tickets : ${item.selectedSeats.length}`}</p>
              <p><strong>Seats:</strong> {Array.isArray(item.selectedSeats) ? item.selectedSeats.join(', ') : 'N/A'}</p>
              <div className='flex gap-2 items-center md:flex-row'>
                <p className=' font-bold text-[8px] md:text-[22px] text-[#EBEBEB] '>{`Total: ₹${item.showPrice * item.selectedSeats.length}`}</p>
                {!item.isPaid && <button onClick={() => payNowHandler(item)} className='text-[10px] md:text-[16px] bg-primary justify-evenly px-[0.5vw] py-[0.5vh] rounded-full cursor-pointer'>Pay Now</button>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

  )
    : isLoading ? <Spinner /> : <div className='text-center py-[30vh]'><h2>No Booked Movie yet</h2></div>
}

export default MyBookings;