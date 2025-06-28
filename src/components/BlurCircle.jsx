const BlurCircle = ({ top, left, right, bottom }) => {
  return (
    <div
      className="hidden md:block absolute w-[223px] h-[223px] bg-primary opacity-[41%] blur-3xl rounded-full -z-50"
      style={{ top, left, right, bottom }}></div>
  );
};

export default BlurCircle;
