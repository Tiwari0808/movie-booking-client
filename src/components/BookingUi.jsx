import { useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import CalanderDate from './CalanderDate'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const BookingUi = ({ show, id }) => {
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
            scrollTo({top:0,behavior:'smooth'})
        }
    }

    return (
        <div id='bookingUI' className='flex flex-wrap bg-primary/15 w-full h-[25vh] rounded-[12px] border px-[3vw] border-primary py-2'>
            <h2 className='text-lg font-semibold'>Choose Date</h2>
            <div className='flex items-center justify-between gap-[2vh] flex-wrap'>
                <div className='flex flex-wrap gap-2 items-center'>
                    <FaAngleDoubleLeft className='text-primary cursor-pointer' />
                    {Object.keys(show.dateTime).map((date, idx) => (
                        <CalanderDate
                            key={idx}
                            date={date}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    ))}
                </div>
                <button onClick={bookNowHandler} className='w-[6rem] bg-primary rounded-full p-1.5 cursor-pointer'>
                    Book Now
                </button>
            </div>
        </div>
    )
}

export default BookingUi
