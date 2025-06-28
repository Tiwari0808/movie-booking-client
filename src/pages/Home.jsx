import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import { motion } from "framer-motion";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
    </div>
  );
};

export default Home;



// import { useEffect } from "react";
// import HeroSection from "../components/HeroSection";
// import FeaturedSection from "../components/FeaturedSection";
// import { motion } from "framer-motion";

// const Home = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [])
//   return (
//     <div>
//       <motion.div
//         initial={{ opacity: 0.45, scale: 0.6 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1.6, delay: 0 }}>
//         <HeroSection />
//       </motion.div>
//       <FeaturedSection />
//     </div>
//   );
// };

// export default Home;
