import { IoIosTrendingUp } from "react-icons/io";
import MovieCard from '../../components/MovieCard'
import { dummyDashboardData } from "../../assets/assets";

const Dashboard = () => {
  return (
    <div className='md:px-[6vw] md:py-[4vh] px-3 py-3 flex flex-col gap-6'>
      <div className=''>
        <h2 className='max-w-[206px] md:text-[26px] text-left flex gap-1'>Admin <span className='text-primary'>Dashboard</span></h2>
      </div>
      <div className="flex flex-wrap gap-5">
        <div>
          <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
            <div className='flex flex-col gap-2'>
              <p className='text-[#FFFFFF] text-[12px]'>Total Bookings</p>
              <p>{dummyDashboardData.totalBookings}</p>
            </div>
            <IoIosTrendingUp className="text-[30px]" />
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
            <div className='flex flex-col gap-2'>
              <p className='text-[#FFFFFF] text-[12px]'>Total Revenue</p>
              <p>{dummyDashboardData.totalRevenue}</p>
            </div>
            <IoIosTrendingUp className="text-[30px]" />
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
            <div className='flex flex-col gap-2'>
              <p className='text-[#FFFFFF] text-[12px]'>Active Movies</p>
              <p>{dummyDashboardData.activeShows.length}</p>
            </div>
            <IoIosTrendingUp className="text-[30px]" />
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between px-6 py-2 bg-primary/30 w-[196px] h-[77px] rounded-[6px] border border-primary'>
            <div className='flex flex-col gap-2'>
              <p className='text-[#FFFFFF] text-[12px]'>Total Users</p>
              <p>{dummyDashboardData.totalUser}</p>
            </div>
            <IoIosTrendingUp className="text-[30px]" />
          </div>
        </div>
      </div>
      <div>
        <div className="mt-10">
          <h2>Active Movies</h2>
        </div>
        <div className="flex flex-wrap gap-5">
          {dummyDashboardData.activeShows.slice(0,3).map((item) => (
               <MovieCard key={item._id} movie={item.movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard