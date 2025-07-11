import { IoIosTrendingUp } from "react-icons/io";
import MovieCard from '../../components/MovieCard';
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaStar, FaUsers } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { MotionConfig, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Fetch bookings
      const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
      const bookings = bookingsSnapshot.docs.map(doc => doc.data());
      const totalBookings = bookings.length;
      const totalRevenue = bookings
        .filter(b => b.isPaid)
        .reduce((acc, b) => acc + b.showPrice * b.selectedSeats.length, 0);

      // Fetch shows
      const showsSnapshot = await getDocs(collection(db, 'shows'));
      const shows = showsSnapshot.docs.map(doc => doc.data());



      // Optional: fetch user count from Auth API (currently mocked as 0)
      const dashboardInfo = {
        totalBookings,
        totalRevenue,
        activeShows: shows,
        totalUser: 0
      };
      setDashboardData(dashboardInfo);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !isLoading ? (
    <div  className='md:px-[6vw] md:py-[4vh] px-3 py-3 flex flex-col gap-6'>
      <div className=''>
        <h2 className='max-w-[206px] md:text-[26px] text-left flex gap-1'>
          Admin <span className='text-primary'>Dashboard</span>
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-5 justify-center">
        {/* Total Bookings */}
        <div onClick={()=>navigate('/admin/listBookings')} className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary cursor-pointer'>
          <div className='flex flex-col gap-2'>
            <p className='text-[#FFFFFF] text-[12px]'>Total Bookings</p>
            <p>{dashboardData.totalBookings}</p>
          </div>
          <IoIosTrendingUp className="text-[30px]" />
        </div>

        {/* Total Revenue */}
        <div onClick={()=>navigate('/admin/listBookings')} className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary cursor-pointer'>
          <div className='flex flex-col gap-2'>
            <p className='text-[#FFFFFF] text-[12px]'>Total Revenue</p>
            <p>₹{dashboardData.totalRevenue}</p>
          </div>
          <MdOutlineAttachMoney className="text-[30px]" />
        </div>

        {/* Active Movies */}
        <a className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary' href="#active">
          <div className='flex flex-col gap-2' >
            <p className='text-[#FFFFFF] text-[12px]'>Active Movies</p>
            <p>{dashboardData.activeShows.length}</p>
          </div>
          <MdLocalMovies className="text-[30px]" />
        </a>

        {/* Total Users (mocked) */}
        <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
          <div className='flex flex-col gap-2'>
            <p className='text-[#FFFFFF] text-[12px]'>Total Users</p>
            <p>{dashboardData.totalUser}</p>
          </div>
          <FaUsers className="text-[30px]" />
        </div>
      </div>

      {/* Active Shows */}
      {dashboardData.activeShows.length>0 ? <div className="flex flex-col gap-10">
        <div className="mt-10">
          <h2>Active Movies</h2>
        </div>
        <div className="flex flex-wrap gap-5 justify-center" id="active">
          {dashboardData.activeShows.map((movie, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='relative p-3  bg-[#12161C] rounded-[16px] flex flex-col gap-[1rem]'>
              <img onClick={() => (navigate(`/movies/${movie.movieId}`), scrollTo(0, 0))} className='bg-cover bg-center rounded-[6px] h-[161px] cursor-pointer' src={movie.poster_path} alt="movie" />
              <p className='h-[38px] font-[Heebo] font-bold leading-[117%] align-middle'>{movie.movieTitle}</p>
              <div className='flex items-center justify-between'>
                <button onClick={() => (navigate(`/movies/${movie.movieId}`), scrollTo(0, 0))} className='w-[6rem] bg-primary rounded-full p-1.5 cursor-pointer'>Buy Ticket</button>
                <div className='flex gap-2 items-center'>
                  <FaStar className='text-primary w-[18px] h-[18px]' />
                  <p className='text-[#797B7D] text-[16px]'>{movie.vote_average ? movie.vote_average.toFixed(1) : '8.2'}</p>
                </div>
              </div>
            </motion.div>)
          )}
        </div>
      </div>:<div className="text-center mt-[10%]"><h2>No Active Movies</h2></div>}

    </div>
  ) : (
    <Spinner />
  );
};

export default Dashboard;
