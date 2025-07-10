import { CiClock1 } from "react-icons/ci";
import { assets } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { FaAngleRight } from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import RenderSeat from "../components/RenderSeats";
import { number } from "framer-motion";

const SeatLayout = () => {
  const groupRows = [
    ["A", 9],
    ["B", 9],
    ["C", 18],
    ["D", 18],
    ["E", 18],
    ["F", 18],
    ["G", 18],
  ];

  const navigate = useNavigate();

  const { id, date } = useParams();
  const [show, setShow] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPrice, setShowPrice] = useState(null);
  const getShow = async () => {
    const snapshot = await getDocs(collection(db, "shows"));
    const shows = snapshot.docs.map((show) => ({
      id: show.id,
      ...show.data(),
    }));
    const show = shows.find((show) => show.movieId === id);
    if (show) {
      setShow(show);
      setShowPrice(Number(show.showPrice));
    } else {
      toast.error("No Shows found for this movie");
      setShow(null);
    }
  };  

  const bookingData = {
    movieName: show ? show.movieTitle : "",
    date,
    selectedSeats,
    selectedTime: selectedTime,
    poster_path: show ? show.poster_path : '',
    showPrice:showPrice,
    isPaid:false,
    runtime:show?show.runtime:null
  };

  const timingsOfSelectedShow = show ? show.selectedDateTime.filter((dt) => {
    const dtDate = dt.split("T")[0];
    return dtDate === date;
  }) : '';

  const bookingHandler = async () => {
    if (selectedSeats.length < 1) {
      return toast.error("Please select the seat");
    }
    try {
      await addDoc(collection(db, "bookings"), bookingData);
      const showRef = doc(db, "shows", show.id);
      await updateDoc(showRef, {
        [`occupiedSeats.${selectedTime}`]: {
          ...(show.occupiedSeats?.[selectedTime] || {}),
          ...Object.fromEntries(
            selectedSeats.map((seat, index) => [seat, `Booked`])
          ),
        },
      });
      toast.success("Booking Confirmed");
      navigate("/myBookings");
      scrollTo(0, 0);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select the time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select 5 seats");
    }
    setSelectedSeats((prev) =>
      selectedSeats.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <div className="px-4 py-[15vh] md:px-12 lg:px-[112px] md:py-20 flex flex-col lg:flex-row gap-8 md:gap-10">
      {/* LEFT: Show Times */}
      <div className="flex flex-col justify-center">
        <div className="px-2 py-2 gap-4 w-full lg:w-[222px] max-h-[240px] bg-primary/15 rounded-[12px] border border-primary flex flex-col justify-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-base md:text-lg font-semibold text-center">{`Available Timings for${""}`}</h2>
            <p className="text-[8px] text-primary text-center">
              {show.movieTitle}
            </p>
            <p className="text-[16px] text-center">{`on ${date}`}</p>
          </div>

          {
            timingsOfSelectedShow.map((item, idx) => (
              <div
                key={idx}
                onClick={() => (
                  setSelectedTime(item), toast.success("Time Selected")
                )}
                className={`flex gap-1 items-center ${selectedTime === item ? "bg-primary" : ""
                  } hover:bg-primary-dull rounded-r-[8px] p-1 w-[70%] md:w-[50%] cursor-pointer mx-4`}>
                <CiClock1 />
                <p className="text-[12px]">{item.split('T')[1]}</p>
              </div>
            ))}
        </div>
      </div>

      {/* MIDDLE: Screen + Seats */}
      <div className="w-full flex flex-col gap-[1vh] h-screen items-center">
        <div className="flex justify-center w-full flex-col items-center py-4 gap-2">
          <h2 className="text-xl md:text-2xl font-semibold">
            Select Your Seat
          </h2>
          <p className="text-[8px] text-primary">{show.movieTitle}</p>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={assets.screenImage}
            alt="Screen"
            className="w-[80%] max-w-[500px]"
          />
        </div>
        <h2 className="text-center text-sm md:text-base text-white/70">
          SCREEN SIDE
        </h2>

        {/* SEATS */}
        <div className="flex flex-col gap-4 mt-4 md:mt-8 items-center justify-center">
          {groupRows.map(([row, count]) => (
            <div key={row} className="flex gap-4  items-center justify-center">
              <div className="hidden md:flex w-5 text-right text-sm text-white/80">
                {row}
              </div>
              <RenderSeat selectedTime={selectedTime} row={row} show={show} count={count} handleSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
            </div>
          ))}
        </div>

        {/* Seat Numbers Row */}
        <div className="hidden md:flex md:gap-[1.5vw] items-center lg:ml-7 justify-center lg:gap-[0.9vw] mt-4">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className="w-[24px] text-center text-xs text-white/50">
              {i + 1}
            </span>
          ))}
        </div>
        <div
          onClick={() => bookingHandler()}
          className={`border cursor-pointer  border-primary flex justify-center ${selectedSeats.length > 0 && "bg-primary"
            } items-center w-[98px] px-2 py-1 rounded-full`}>
          <button className="cursor-pointer text-[16px] text-center">
            Checkout
          </button>
          <FaAngleRight />
        </div>
      </div>
    </div>
  ) : (
    <div className="px-[0%] py-[15%] flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default SeatLayout;
