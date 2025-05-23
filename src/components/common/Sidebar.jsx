import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { BiMenu } from "react-icons/bi";
import SidebarMenu from "./SidebarMenu";
import { DataContext } from "../../contexts/DataContexts";
import { FetchUserData } from "../../utils/fetchData.utils";
import { auth } from "../../../Database/Firebase.config";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const { currentUser, setCurrentUser } = useContext(DataContext);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0)

  useEffect(() => {
    FetchUserData(auth.currentUser?.uid)
      .then((data) => setCurrentUser(data))
      .catch(console.error);
  }, [auth.currentUser?.uid]);

  const navItems = [
    { label: "Home", icon: AiFillHome, path: "/" },
    { label: "Search", icon: AiOutlineSearch, path: "/search" },
    { label: "Explore", icon: AiOutlineCompass, path: "/explore" },
    { label: "Messages", icon: FiSend, path: "/messages" },
    { label: "Notifications", icon: AiOutlineHeart, path: "/notifications" },
    { label: "Add Story", icon: AiOutlinePlusSquare, path: "/add_story" },
    {
      label: "Profile",
      icon: "profile",
      path: `/profile/${currentUser?.userId}`,
      img:
        currentUser?.imgUrl ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8mEIWZjRFdiO4YIkq790lTaNzTtCH6DcwrQ&s",
    },
    { label: "More", icon: BiMenu, path: "/more" },
  ];

  return (
    <div className="w-1/5 h-screen overflow-hidden p-5 border-gray-300 text-mainfontColor">
      <div className="w-64 h-full py-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 font-sans">Awaaz</h1>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, icon: Icon, path, img }, index) => {
            const isActive = location.pathname === path;
            const isLast = index === navItems.length - 1;

            return (
              <div
                key={label}
                onClick={() => {
                  if (isLast) {
                    setShowSidebarMenu((prev) => !prev);
                  } else {
                    navigate(path);
                  }
                }}
                className={` flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer transition-all
                ${isActive ? "font-semibold bg-gray-100" : "hover:bg-gray-100"}
                ${isLast ? "mt-8 relative" : ""}`}
              >
                {showSidebarMenu && isLast && (
            <div className="absolute bottom-0 left-0 z-1000">
              <SidebarMenu setShowSidebarMenu={setShowSidebarMenu}/>
            </div>
          )}
                {label === "Profile" && img ? (
                  <img
                    src={img}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <Icon size={24} />
                )}
                <span>{label}</span>
                {
                  label === 'Notifications' && unreadNotificationCount > 0 && (
                    <span className="w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-sm font-bold text-white">
                      {unreadNotificationCount}
                    </span>
                  )
                }
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
