import { IoIosTrendingUp } from "react-icons/io";
import MovieCard from '../../components/MovieCard'
import { dummyDashboardData } from "../../assets/assets";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });

  const fetchData = async () => {
    setDashboardData(dummyDashboardData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, []);
  return !isLoading ? (
    <div className='md:px-[6vw] md:py-[4vh] px-3 py-3 flex flex-col gap-6'>
      <div className=''>
        <h2 className='max-w-[206px] md:text-[26px] text-left flex gap-1'>Admin <span className='text-primary'>Dashboard</span></h2>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        <div>
          <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
            <div className='flex flex-col gap-2'>
              <p className='text-[#FFFFFF] text-[12px]'>Total Bookings</p>
              <p>{dashboardData.totalBookings}</p>
            </div>
            <IoIosTrendingUp className="text-[30px]" />
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
            <div className='flex flex-col gap-2'>
              <p className='text-[#FFFFFF] text-[12px]'>Total Revenue</p>
              <p>{dashboardData.totalRevenue}</p>
            </div>
            <MdOutlineAttachMoney className="text-[30px]" />
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
            <div className='flex flex-col gap-2'>
              <p className='text-[#FFFFFF] text-[12px]'>Active Movies</p>
              <p>{dashboardData.activeShows.length}</p>
            </div>
            <MdLocalMovies className="text-[30px]" />
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
            <div className='flex flex-col gap-2'>
              <p className='text-[#FFFFFF] text-[12px]'>Total Users</p>
              <p>{dashboardData.totalUser}</p>
            </div>
            <FaUsers className="text-[30px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="mt-10">
          <h2>Active Movies</h2>
        </div>
        <div className="flex flex-wrap gap-5 justify-center">
          {dashboardData.activeShows.slice(0, 3).map((item) => (
            <MovieCard key={item._id} movie={item.movie} />
          ))}
        </div>
      </div>
    </div>
  ) : <Spinner/>
}

export default Dashboard;