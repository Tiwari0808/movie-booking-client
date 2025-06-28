const BlurCircle = ({ top, left, right, bottom }) => {
  return (
    <div
      className=" absolute w-[223px] h-[223px] bg-[#F8456569] opacity-[41%] blur-3xl rounded-full -z-50"
      style={{ top, left, right, bottom }}></div>
  );
};

export default BlurCircle;
