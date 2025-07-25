import { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Spinner from "../../components/Spinner";
import dateFormat from "../../lib/dateFormat";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

const ListShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState(null);
  const [info, setInfo] = useState({
    movieName: '',
    date: null,
    totalBookings: null,
    earnings: null
  })

  const getData = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'shows'));
      const shows = snapshot.docs.map((doc) => ({
        id: doc.movieId,
        ...doc.data()
      }));

      const snapshot2 = await getDocs(collection(db, 'bookings'));
      const bookings = snapshot2.docs.map((item) => ({
        id: item.movieId,
        ...item.data()
      }));
      setBookings(bookings);
      setShows(shows)
    } catch (error) {
      toast.error("Failed to fetch shows:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const seats = (occupiedSeats = {}) => {
    return Object.values(occupiedSeats || {}).reduce((acc, item) => { return acc += Object.keys(item).length }, 0)
  };

  useEffect(() => {
    getData();
  }, []);

  return !loading ? (
    <div className='md:px-[6vw] md:py-[4vh] px-3 py-3 flex flex-col gap-6'>
      <div>
        <h2 className='max-w-[206px] md:text-[26px] text-left flex gap-1'>List <span className='text-primary'>Shows</span></h2>
      </div>
      <div>
        <table className='w-full border-collapse bg-primary/25 border border-primary'>
          <thead className="bg-primary/40 text-white">
            <tr>
              <th className="font-extralight text-[0.5rem] md:text-[0.8rem]">Movie Name</th>
              <th className="font-extralight text-[0.5rem] md:text-[0.8rem]">Total Bookings</th>
              <th className="font-extralight text-[0.5rem] md:text-[0.8rem]">Value</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((item, index) => (
              <tr key={index} className="border-b border-primary/40">
                <td className="py-[1vh] text-center text-[0.6rem]">{item.movieTitle}</td>
                <td className="py-[1vh] text-center text-[0.6rem]">{item.occupiedSeats ? seats(item.occupiedSeats) : 0}</td>
                <td className="py-[1vh] text-center text-[0.6rem]">{seats(item.occupiedSeats) * item.showPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ListShows;



// import { useEffect, useState } from "react"
// import { dummyShowsData } from "../../assets/assets";
// import Spinner from "../../components/Spinner";
// import dateFormat from "../../lib/dateFormat";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase/firebaseConfig";


// const ListShows = () => {
//   const [showsData, setShowsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const getData = async () => {
//     const snapshot = await getDocs(collection(db,'shows'));
//        const shows = snapshot.docs.map((doc) => {
//       const data = doc.data();
//       const movie = dummyShowsData.find((m) => m.id === data.movieId);
//       return {
//         id: doc.id,
//         movie,
//         showPrice: data.showPrice,
//         selectedDateTime: data.selectedDateTime,
//         occupiedSeats: data.occupiedSeats || {}
//       };
//     });
//     setShowsData(shows);
//     setLoading(false);
//   }

//   useEffect(() => {
//     getData()
//   }, [])

//   return !loading ? (
//     <div className='md:px-[6vw] md:py-[4vh] px-3 py-3 flex flex-col gap-6'>
//       <div>
//         <h2 className='max-w-[206px] md:text-[26px] text-left flex gap-1'>List<span className='text-primary'>Bookings</span></h2>
//       </div>
//       <div>
//         <div >
//           <table className='w-full border-collapse bg-primary/25 border border-primary'>
//             <thead className="bg-primary/40 text-white">
//               <tr>
//                 <th className=" py-[1vh] text-center text-[0.8rem]">Movie Name</th>
//                 <th className=" py-[1vh] text-center text-[0.8rem]">Date</th>
//                 <th className=" py-[1vh] text-center text-[0.8rem]">Total Booking</th>
//                 <th className=" py-[1vh] text-center text-[0.8rem]">Earning</th>
//               </tr>
//             </thead>
//             <tbody>
//               {showsData.map((item, index) => (
//                 <tr key={index} className="border-b border-primary/40">
//                   <td className="py-[1vh] text-center text-[0.6rem]">{item.movie.title}</td>
//                   <td className="py-[1vh] text-center text-[0.6rem]">{dateFormat(item.showDateTime)}</td>
//                   <td className="py-[1vh] text-center text-[0.6rem]">{Object.keys(item.occupiedSeats).length}</td>
//                   <td className="py-[1vh] text-center text-[0.6rem]">{`₹${Object.keys(item.occupiedSeats).length * item.showPrice}`}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   ) : <Spinner />
// }

// export default ListShows;