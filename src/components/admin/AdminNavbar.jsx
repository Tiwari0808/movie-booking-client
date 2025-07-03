import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
      <div className='border-b border-gray-600/40 '>
      <Link  to={'/'}>
       <img className=' px-7 py-5' src={assets.logo} alt="Go to Homepage" />
      </Link>
      </div>
  )
}

export default AdminNavbar