import { assets } from "../assets/assets";
import { BsCalendar2 } from "react-icons/bs";
import { LuTimer } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.92]);
  const navigate = useNavigate();

  return (
    <div className="bg-[url('/backgroundImage.png')] h-screen bg-cover bg-center">
      <motion.div
        className="flex flex-col gap-[3vh] max-lg:left-[5vw] max-md:top-[50vh] absolute left-[11vw] top-[25vh] align-middle"
        style={{ opacity, scale }}>
        <motion.img
          src={assets.marvelLogo}
          alt="movie logo"
          className="max-h-10  max-w-[173px] max-md:max-w-[100px]"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.h2
          className="max-w-[739px] h-[150px] max-md:h-[78px]  font-semibold text-[64px] max-md:text-[44px] leading-[117%] "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          Guardians <br /> of the Galaxy
        </motion.h2>
        <motion.div
          className="flex min-md:font-medium items-center gap-4 max-md:gap-2 max-md:text-[12px] max-md:mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}>
          <span className="text-[#D1D5DC]">Action | Adventure | Sci-Fi</span>
          <motion.div
            className="flex items-center gap-2 max-md:gap-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}>
            <BsCalendar2 />
            2018
            <LuTimer />
            2h 18m
          </motion.div>
        </motion.div>
        <motion.div
          className="max-w-[449px] text-[#EBF3FF] max-md:leading-[105%]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}>
          <p>
            In a post-apocalyptic world where cities ride on wheels and consume
            each other to survive, two people meet in London and try to stop a
            conspiracy.
          </p>
        </motion.div>
        <motion.button
          className=" bg-primary hover:bg-primary-dull rounded-[32px] max-w-[164px] max-md:w-[100px] h-11 max-md:h-8 max-md:text-[10px] flex justify-center items-center gap-2 max-md:gap-1 cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={() => navigate("/movies")}>
          Explore Movies
          <FaArrowRight />
        </motion.button>
      </motion.div>
    </div>
  );
};
export default HeroSection;
