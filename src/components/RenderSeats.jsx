
const RenderSeat = ({ row, count, show , selectedSeats, handleSeatClick,selectedTime}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isBooked =
          show ? (show.occupiedSeats?.[selectedTime]?.[seatId] === "Booked") : ''
        const isSelected = selectedSeats.includes(seatId);
        return (
          <div
            onClick={() => {
              if (!isBooked) handleSeatClick(seatId);
            }}
            key={seatId}
            className={`w-[24px] h-[24px] md:w-[28px] md:h-[28px] border rounded-[4px] flex justify-center items-center
              ${isBooked ? "bg-gray-500 cursor-not-allowed border-primary" : ""}
              ${isSelected ? "bg-primary" : ""}
              ${
                !isBooked && !isSelected
                  ? "hover:bg-primary-dull cursor-pointer"
                  : ""
              }
              border-green-500`}>
            <button disabled={isBooked} className={``}>
              <p
                className={` text-[7px] md:text-[8px] ${
                  isBooked ? "cursor-not-allowed" : "cursor-pointer"
                }`}>
                {seatId}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default RenderSeat;
