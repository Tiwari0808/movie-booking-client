import { assets } from '../../assets/assets'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <AdminNavbar />
            <div className='flex'>
                <div className='border-r h-[50vh] border-primary/20 flex flex-col '>
                    <div className='flex flex-col items-center justify-center p-2 '>
                        <img className='rounded-full w-6 h-6 md:w-[56px] md:h-[56px]' src={assets.profile} alt="" />
                        <p className='hidden md:flex'>Divyanshu Tiwari</p>
                    </div>
                    <AdminSidebar />
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout