import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='py-3'>
      <div className='flex flex-col gap-10 md:flex-row md:justify-between items-start py-10 px-6 sm:px-10 bg-[#111] text-white'>
        <div className='md:max-w-[445px] flex flex-col gap-4 text-center md:text-left'>
          <img className='max-w-[145px] mx-auto md:mx-0' src={assets.logo} />
          <p className='text-[14px] text-[#FFFFFFCC] opacity-80'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt soluta sint culpa fugit facere asperiores tempora inventore adipisci qui suscipit.
          </p>
          <div className='flex gap-4 justify-center md:justify-start'>
            <img className='w-[120px]' src={assets.appStore} alt="App Store" />
            <img className='w-[120px]' src={assets.googlePlay} alt="Google Play" />
          </div>
        </div>

        <div className=' hidden md:flex flex-col items-center md:items-start text-center md:text-left gap-2'>
          <h3 className='font-semibold'>Company</h3>
          <div className='flex flex-col gap-2 text-[14px] text-[#FFFFFFCC] opacity-80'>
            <a href="">Home</a>
            <a href="">About us</a>
            <a href="">Contact us</a>
            <a href="">Privacy policy</a>
          </div>
        </div>

        <div className='hidden md:flex flex-col items-center md:items-start text-center md:text-left gap-2'>
          <h3 className='font-semibold'>Get in touch</h3>
          <div className='flex flex-col gap-2 text-[14px] text-[#FFFFFFCC] opacity-80'>
            <p>+91 935970100</p>
            <a href="">divyanshutiwari173@gmail.com</a>
          </div>
        </div>
      </div>

      <hr className='border-[] text-[#4B4F54] w-full' />
      <p className='text-center text-[15px] opacity-[60%] font-light py-1'>Copyright 2025 © Divyanshu. All Right Reserved.</p>
    </div>
  );
};

export default Footer;
