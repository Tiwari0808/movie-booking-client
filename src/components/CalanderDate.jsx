import React from 'react'

const CalanderDate = ({date,day}) => {
    return (
        <div className='flex items-center justify-center  border border-primary-dull w-[45px] h-[45px] rounded-[12px]'>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-[15px]' >{day}</p>
                <p className='text-[15px]'>{date}</p>
            </div>
        </div>
    )
}

export default CalanderDate