import React from 'react'

const Spinner = () => {
  return (
     <div  className='py-[27vh] md:px-[15vw] flex justify-center'>
      <div className="animate-spin h-14 w-14 rounded-full border-2 border-t-primary"></div>
    </div>
  )
}

export default Spinner