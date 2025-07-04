import { useEffect, useState } from "react"
import { dummyShowsData } from "../../assets/assets";
import Spinner from "../../components/Spinner";
import dateFormat from "../../lib/dateFormat";


const ListShows = () => {
  const [showsData, setShowsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    setShowsData([{
      movie: dummyShowsData[0],
      showDateTime: "2025-07-24T01:00:00.000Z",
      showPrice: 59,
      occupiedSeats: {
        A1: 'User1',
        A2: 'User2',
        A3: 'User3'
      }
    }]);
    setLoading(false);
  }

  useEffect(() => {
    getData()
  }, [])

  return !loading ? (
    <div className='md:px-[6vw] md:py-[4vh] px-3 py-3 flex flex-col gap-6'>
      <div>
        <h2 className='max-w-[206px] md:text-[26px] text-left flex gap-1'>List<span className='text-primary'>Bookings</span></h2>
      </div>
      <div>
        <div >
          <table className='w-full border-collapse bg-primary/25 border border-primary'>
            <thead className="bg-primary/40 text-white">
              <tr>
                <th className=" py-[1vh] text-center text-[0.8rem]">Movie Name</th>
                <th className=" py-[1vh] text-center text-[0.8rem]">Date</th>
                <th className=" py-[1vh] text-center text-[0.8rem]">Total Booking</th>
                <th className=" py-[1vh] text-center text-[0.8rem]">Earning</th>
              </tr>
            </thead>
            <tbody>
              {showsData.map((item, index) => (
                <tr key={index} className="border-b border-primary/40">
                  <td className="py-[1vh] text-center text-[0.6rem]">{item.movie.title}</td>
                  <td className="py-[1vh] text-center text-[0.6rem]">{dateFormat(item.showDateTime)}</td>
                  <td className="py-[1vh] text-center text-[0.6rem]">{Object.keys(item.occupiedSeats).length}</td>
                  <td className="py-[1vh] text-center text-[0.6rem]">{`₹${Object.keys(item.occupiedSeats).length * item.showPrice}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Spinner />
}

export default ListShows