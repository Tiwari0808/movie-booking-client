import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { dummyShowsData } from "../../assets/assets";
import Spinner from "../../components/Spinner";
import { kCounter } from "../../lib/kCounter";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Addshows = () => {
  const [shows, setShows] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [showPrice, setShowPrice] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState([]);
  const [selectDateTime, setSelectDateTime] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [poster_path, setPoster_path] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "movies"));
      const movies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShows(movies);
      setIsLoading(false);
    } catch (error) {
      return toast.error(error.message || "Failed to fetch data");
    }
  };

  const dateBtnHandler = () => {
    if (!selectedMovieId) {
      return toast.error("Select Movie first");
    }
    if (!selectDateTime) {
      return toast.error("Select Date and Time");
    }
    if (selectedDateTime.length > 2) {
      return toast.error("You can select only two shows time");
    }
    setSelectedDateTime([...selectedDateTime, selectDateTime]);
    setSelectDateTime("");
    return toast.success("Date Time selected successfully");
  };

  const addShowBtnHandler = async () => {
    if (!showPrice) {
      return toast.error("Please Show Price");
    }
    if (!selectedMovieId) {
      return toast.error("Select the Movie");
    }
    if (selectedDateTime.length < 1) {
      return toast.error("Select Show Date and Time");
    }
    if (selectedDateTime.length > 1) {
      return toast.error("You can select only three shows time");
    }
    if (selectedDateTime.includes(selectDateTime)) {
      return toast.error("This time slot is already selected");
    }
    if (!user) {
      navigate('/admin/login')
      return toast.error('Please login to add shows');
    }

    const addShowData = {
      showPrice: showPrice,
      movieId: selectedMovieId,
      movieTitle: movieTitle,
      selectedDateTime: selectedDateTime,
      poster_path: poster_path,
      runtime: runtime
    };

    try {
      await addDoc(collection(db, "shows"), addShowData);
      setShowPrice("");
      setSelectDateTime("");
      setSelectedMovieId(null);
      setSelectedDateTime([]);
      return toast.success("Show added to backend successfully");
    } catch (error) {
      toast.error(error.message || "Failed to add the Show");
    }
  };

  const clearDateTimeHandler = (id) => {
    setSelectedDateTime(selectedDateTime.filter((_, i) => i !== id));
  };

  useEffect(() => {
    getData();
  }, []);

  return !isLoading ? (
    <div className="md:px-[6vw] md:py-[4vh] px-3 py-3 flex flex-col gap-6">
      <div className="">
        <h2 className="max-w-[206px] md:text-[26px] text-left flex gap-1">
          Add <span className="text-primary">Shows</span>
        </h2>
      </div>
      <p className="font-bold text-[#FFFFFF]">Movies You Can List</p>
      <div className="flex flex-wrap justify-evenly gap-5">
        {shows.map((item) => (
          <div key={item.id} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <div
                onClick={() => (
                  setSelectedMovieId(
                    selectedMovieId === item.id ? null : item.id
                  ),
                  setMovieTitle(item.title),
                  setPoster_path(item.poster_path),
                  setRuntime(item.runtime),
                  toast.success(`Movie ${item.title} selected`)
                )}
                className="max-w-[202px] max-h-[300px] relative">
                {selectedMovieId === item.id && (
                  <FaCheckSquare className="absolute top-3 right-5 text-primary" />
                )}
                <img className="cursor-pointer" src={item.poster_path} alt="" />
                <div className="bg-black flex justify-between px-2">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-primary w-[18px] h-[18px]" />
                    <p>{`${item.vote_average.toFixed(1)}/10`}</p>
                  </div>
                  <p>{`${kCounter(item.vote_count)} k Votes`}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col py-3 ">
              <p className="font-bold text-[#FFFFFF]">
                {item.title.slice(0, 25)}
              </p>
              <div className="flex gap-2">
                {item.genres.slice(0, 3).map((genre, index) => (
                  <p
                    key={index}
                    className="text-[12px] text-[#ABABAB]">{`${genre.name}`}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <p>Show Price</p>
          <input
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            className="bg-primary/30 border border-primary rounded-[4px] px-2 py-2"
            placeholder="Enter Show Price"
            type="number"
            name=""
            id=""
          />
        </div>
        <div>
          <p>Select Date and Time</p>
          <input
            value={selectDateTime}
            onChange={(e) => setSelectDateTime(e.target.value)}
            className="bg-primary/30 border border-primary rounded-[4px] px-2 py-2"
            type="datetime-local"
            name=""
            id=""></input>
          <button
            onClick={() => dateBtnHandler()}
            className="bg-primary-dull  px-2 py-1 rounded-[6px] hover:bg-primary cursor-pointer ml-5  ">
            Add
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <p>Selected Date and Time</p>
          {selectedDateTime.map((dateTime, i) => {
            const [date, time] = dateTime.split("T");
            return (
              <div key={i} className="flex flex-col gap-2">
                <div className="border border-primary rounded-[6px] w-auto  flex items-center px-2 gap-2">
                  <p>{`Date : ${date},`}</p>
                  <p>{`Time : ${time}`}</p>
                  <RxCross1
                    onClick={() => clearDateTimeHandler(i)}
                    className="text-primary cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => addShowBtnHandler()}
            className="bg-primary-dull w-[106px] h-[38px] rounded-[8px] hover:bg-primary cursor-pointer">
            Add Show
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default Addshows;
