
const CalanderDate = ({ date, selectedDate, setSelectedDate }) => {
  return (
    <div
      onClick={() => setSelectedDate(date)}
      className={`flex items-center justify-center cursor-pointer border ${
        selectedDate === date ? 'bg-primary text-white' : ''
      } border-primary-dull hover:bg-primary-dull w-[45px] h-[45px] rounded-[12px]`}
    >
      <div className='flex flex-col items-center justify-center'>
        <p className='text-[15px]'>{new Date(date).toLocaleDateString('en-US',{month:'short'})}</p>
        <p className='text-[15px]'>{new Date(date).getDate()}</p>
      </div>
    </div>
  )
}

export default CalanderDate
