import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAuth } from '../../context/AuthContext'

const AdminNavbar = () => {
  const {logout,user} = useAuth();
  return (
      <div className='border-b border-primary/20 flex items-center justify-between px-7 py-5'>
      <Link  to={'/'}>
       <img className='' src={assets.logo} alt="Go to Homepage" />
      </Link>
      <div className='flex items-center gap-3'>
        {user && <button onClick={()=>logout()} className='bg-primary px-2 py-2 rounded-[8px] cursor-pointer'>Logout</button>}
      </div>
      
      </div>
  )
}

export default AdminNavbar