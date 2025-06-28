import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { RiMenu3Fill } from 'react-icons/ri'
import { CiSearch } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'
import { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className=' fixed flex top-0 left-0 w-full z-50 items-center justify-between px-6 py-6 md:px-16 lg:px-36'>
            <Link to='/' className='max-md:flex-1'>
                <img src={assets.logo} alt="logo" className='w-36 h-7' />
            </Link>
            <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
            max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-5
            min-md:px-8 min-md:py-2 md:mx-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/40 md:bg-white/10 md:border md:border-gray-600 overflow-hidden transition-[width] duration-300
             ${isOpen ? 'max-md:w-screen' : 'w-0'} md:text-sm min-md:w-auto min-lg:justify-center min-lg:gap-7 min-lg:font-medium`}>
                <RxCross2 onClick={() => setIsOpen(!isOpen)} className='w-6 h-6 md:hidden cursor-pointer absolute top-7 right-5' />
                <Link onClick={() => { setIsOpen(!isOpen); scrollTo(0, 0) }} to='/'>Home</Link>
                <Link onClick={() => { setIsOpen(!isOpen); scrollTo(0, 0) }} to='/movies'>Movies</Link>
                <Link onClick={() => { setIsOpen(!isOpen); scrollTo(0, 0) }} to='/'>Theaters</Link>
                <Link onClick={() => { setIsOpen(!isOpen); scrollTo(0, 0) }} to='/'>Releases</Link>
                <Link onClick={() => { setIsOpen(!isOpen); scrollTo(0, 0) }} to='/favorites'>Favorites</Link>
            </div>
            <div className='flex items-center gap-8 '>
                <CiSearch className='max-md:hidden w-6 h-6 cursor-pointer' />
                <button className='px-4 py-2   rounded-4xl bg-primary hover:bg-primary-dull transition font-medium cursor-pointer '>Login</button>
            </div>
            <RiMenu3Fill onClick={() => setIsOpen(!isOpen)} className='min-sm:text-sm min-sm:font-normal max-md:ml-4 md:hidden w-6 h-6 cursor-pointer' />
        </div>
    )
}

export default Navbar