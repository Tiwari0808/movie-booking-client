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
    const snapshot = getDocs(collection(db,'shows'));
    const shows = (await snapshot).docs.map((doc)=>({
      id:movie.id,
      ...doc.data()
    }))
    setshowsData(dummyBookingData);
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
                <th className=" py-[1vh] text-center text-[0.8rem]">User Name</th>
                <th className=" py-[1vh] text-center text-[0.8rem]">Movie Name</th>
                <th className=" py-[1vh] text-center text-[0.8rem]">Show Time</th>
                <th className=" py-[1vh] text-center text-[0.8rem]">Seats</th>
                <th className=" py-[1vh] text-center text-[0.8rem]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {showsData.map((item, index) => (
                <tr key={index} className="border-b border-primary/40">
                  <td className="py-[1vh] text-[0.6rem] text-center">{item.user.name}</td>
                  <td className="py-[1vh] text-[0.6rem] text-center">{item.show.movie.title}</td>
                  <td className="py-[1vh] text-[0.6rem] text-center">{dateFormat(item.show.showDateTime)}</td>
                  <td className="py-[1vh] text-[0.6rem] text-center">{`${item.bookedSeats}`}</td>
                  <td className="py-[1vh] text-[0.6rem] text-center">{`₹${item.amount}`}</td>
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