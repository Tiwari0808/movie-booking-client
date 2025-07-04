import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdAddCard } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { RiReservedFill } from "react-icons/ri";

const AdminSidebar = () => {
  return (
    <div>
      <nav className="flex flex-col">
        <NavLink
          end
          className={({ isActive }) =>
            isActive
              ? `bg-primary/20 text-primary px-3 py-3 text-[16px] flex items-center gap-2`
              : "px-3 py-3 text-[16px] flex items-center gap-2"
          }
          to="/admin">
          <span>
            <LuLayoutDashboard />
          </span>
          <p className="hidden md:flex">Dashboard</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary/20 text-primary px-3 py-3 text-[16px] flex items-center gap-2 "
              : "px-3 py-3 text-[16px] flex items-center gap-2"
          }
          to="/admin/addShows">
          <span>
            <MdAddCard />
          </span>
          <p className="hidden md:flex">Add Shows</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary/20 text-primary px-3 py-3 text-[16px] flex items-center gap-2 "
              : "px-3 py-3 text-[16px] flex items-center gap-2"
          }
          to="/admin/listShows">
          <span>
            <FaListAlt />
          </span>
          <p className="hidden md:flex">List Shows</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-primary/20 text-primary px-3 py-3 text-[16px] flex items-center gap-2 "
              : "px-3 py-3 text-[16px] flex items-center gap-2"
          }
          to="/admin/listBookings">
          <span>
            <RiReservedFill />
          </span>
         <p className="hidden md:flex">List Bookings</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
