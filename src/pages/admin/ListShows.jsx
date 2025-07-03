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
        <h2 className='max-w-[206px] md:text-[26px] text-left flex gap-1'>List<span className='text-primary'>Shows</span></h2>
      </div>
      <div>
        <div >
          <table className='w-full border-collapse bg-primary/25 border border-primary'>
            <thead className="bg-primary/40 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Movie Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Total Booking</th>
                <th className="px-4 py-2 text-left">Earning</th>
              </tr>
            </thead>
            <tbody>
              {showsData.map((item, index) => (
                <tr className="border-b border-primary/40">
                  <td className="px-4 py-2">{item.movie.title}</td>
                  <td className="px-4 py-2">{dateFormat(item.showDateTime)}</td>
                  <td className="px-4 py-2">{Object.keys(item.occupiedSeats).length}</td>
                  <td className="px-4 py-2">{`₹${Object.keys(item.occupiedSeats).length * item.showPrice}`}</td>
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