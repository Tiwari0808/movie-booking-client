import { assets } from "../assets/assets";
import { BsCalendar2 } from "react-icons/bs";
import { LuTimer } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
    return (
        <div className="bg-[url('/backgroundImage.png')] h-screen bg-cover bg-center">
            <div className="flex flex-col gap-[3vh] max-lg:left-[5vw] max-md:top-[50vh] absolute left-[11vw] top-[25vh] align-middle">
                <img src={assets.marvelLogo} alt="movie logo" className="max-h-10  max-w-[173px]" />
                <h2 className="max-w-[739px] h-[150px] max-md:h-[78px]  font-semibold text-[64px] max-md:text-[44px] leading-[117%] " >Guardians <br /> of the Galaxy</h2>
                <div className="flex min-md:font-medium items-center gap-4 max-md:gap-2 max-md:text-[12px]">
                    <span className="text-[#D1D5DC]">Action | Adventure | Sci-Fi</span>
                    <div className="flex items-center gap-2 max-md:gap-1">
                        <BsCalendar2 />2018
                        <LuTimer />2h 18m
                    </div>
                </div>
                <div className="max-w-[449px] text-[#EBF3FF] max-md:leading-[105%]">
                    <p>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
                </div>
                <button className=" bg-primary hover:bg-primary-dull rounded-[32px] max-w-[164px] max-md:w-[100px] h-11 max-md:h-8 max-md:text-[10px] flex justify-center items-center gap-2 max-md:gap-1 cursor-pointer">Explore Movies<FaArrowRight/></button>
            </div>
        </div>
    );
};
export default HeroSection;
