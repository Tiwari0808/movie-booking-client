import { useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import CalanderDate from './CalanderDate'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const BookingUi = ({ movie, id, listedDateTime }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    const bookNowHandler = () => {
        if (!selectedDate) {
            toast.error("Please Select a Date");
            return;
        }
        else {
            toast.success(`Booking for ${selectedDate} confirmed!`);
            navigate(`/movies/${id}/${selectedDate}`);
            scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const uniqueDates = listedDateTime ? Array.from(new Set(listedDateTime.map(dt => dt.split("T")[0]))):[];
    
    return (
        <div id='bookingUI' className='flex flex-col flex-wrap gap-3 bg-primary/15 w-full  rounded-[12px] border px-[3vw] border-primary py-2'>
            <div className='flex items-center gap-2'>
               <h2 className='font-semibold'>{`Choose Date for`}</h2>
               <p className='text-[12px] text-primary'>{movie.title}</p>
            </div>
            {listedDateTime ? (<div className='flex items-center justify-between gap-[2vh] flex-wrap'>
                <div className='flex flex-wrap gap-2 items-center'>
                    <FaAngleDoubleLeft className='text-primary cursor-pointer' />
                    {uniqueDates.map((date, idx) => (
                        <CalanderDate
                            key={idx}
                            date={date.split("T")[0]}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    ))}
                </div>
                <button onClick={bookNowHandler} className='w-[6rem] bg-primary rounded-full p-1.5 cursor-pointer'>
                    Book Now
                </button>
            </div>) : <div className='text-center'><h2>No active shows for this movie</h2></div>}
        </div>
    )
}

export default BookingUi;
