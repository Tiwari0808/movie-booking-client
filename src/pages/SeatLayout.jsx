import { CiClock1 } from 'react-icons/ci'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import isoTimeFormat from '../lib/isoTimeFormat';

const SeatLayout = () => {
  const { id, date } = useParams();
  const [show, setShow] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const getShow = async () => {
    const show = dummyShowsData.find((item) => item._id === id);
    if (show) {
      setShow({
        show: show,
        dateTime: dummyDateTimeData
      });
    }
  }
  useEffect(() => {
    getShow();
  }, [])



  return show ? (
    <div className='px-[112px] py-[155px] flex gap-10 '>
      <div className={`relative w-[222px] h-[313px] flex-wrap bg-primary/15 rounded-[12px] border border-primary flex flex-col gap-3`}>
        <div className='px-5 py-5'>
          <h2>Available Timings</h2>
        </div>
        {show.dateTime[date].map((item,idx) => (
            <div
            onClick={()=>setIsSelected(item)}
            key={idx} className={`flex gap-1 items-center ${isSelected === item && 'bg-primary'} hover:bg-primary-dull rounded-r-[8px] p-1 w-[50%] cursor-pointer`}>
            <CiClock1 />
            <p className='text-[12px]'>{isoTimeFormat(item.time)}</p>
          </div>
        ))}

      </div>
      <div className='w-full flex flex-col gap-3'>
        <div className='flex justify-center w-full'>
          <h2>Select Your Seat</h2>
        </div>
        <div className='flex items-center justify-center'>
          <img src={assets.screenImage} alt="Screen Image" />
        </div>
        <h2 className='w-full text-center'>SCREEN SIDE</h2>
      </div>
      <div>
      </div>
    </div >
  ) : <Spinner />
}

export default SeatLayout