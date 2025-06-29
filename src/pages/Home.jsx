import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import { motion } from "framer-motion";
import TrailerSection from "../components/TrailerSection";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>
      <FeaturedSection />
      <TrailerSection/>
    </div>
  );
};

export default Home;
