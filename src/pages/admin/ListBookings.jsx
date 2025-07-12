import { collection, getDocs } from 'firebase/firestore';
import { dummyBookingData } from '../../assets/assets';
import Spinner from '../../components/Spinner';
import dateFormat from '../../lib/dateFormat';
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig';

const ListBookings = () => {
  const [showsData, setshowsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    const snapshot =await getDocs(collection(db,'bookings'));
    const shows = snapshot.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
    }))
    setshowsData(shows);
    setIsLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])
  return !isLoading ? (
    <div className='md:px-[6vw] md:py-[4vh] px-3 py-3 flex flex-col gap-6'>
      <div>
        <h2 className='max-w-[206px] md:text-[26px] text-left flex gap-1'>List<span className='text-primary'>Bookings</span></h2>
      </div>
      <div>
        <div >
          <table className='w-full border-collapse bg-primary/25 border border-primary'>
            <thead className="bg-primary/40 text-white">
              <tr>
                <th className="font-extralight text-[8px] md:text-[14px]">User Name</th>
                <th className="font-extralight text-[8px] md:text-[14px]">Movie Name</th>
                <th className="font-extralight text-[8px] md:text-[14px]">Show Time</th>
                <th className="font-extralight text-[8px] md:text-[14px]">Seats</th>
                <th className="font-extralight text-[8px] md:text-[14px]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {showsData.map((item) => (
                <tr key={item.id} className="border-b border-primary/40">
                  <td className="font-extralight text-[7px] text-center md:text-[13px]">{item.name}</td>
                  <td className="font-extralight text-[7px] text-center md:text-[13px]">{item.movieName.slice(0,20)}</td>
                  <td className="font-extralight text-[7px] text-center md:text-[13px]">{item.selectedTime}</td>
                  <td className="font-extralight text-[7px] text-center md:text-[13px]">{item.selectedSeats.join(' ,')}</td>
                  <td className="font-extralight text-[7px] text-center md:text-[13px]">{item.selectedSeats.length*item.showPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Spinner />
}

export default ListBookings