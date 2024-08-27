import {
  ChatBubbleLeftEllipsisIcon,
  FlagIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link, NavLink } from "react-router-dom";

function SideMenu() {
  return (
    <div>
      <div className="hidden lg:flex flex-col border-r-2 h-full p-3 justify-between items-center">
        <nav className="grid gap-8 place-items-center">
          <NavLink
            className="block hover:bg-gray-200 p-2 rounded-md transition-all"
            to="dashboard"
          >
            <HomeIcon className="size-9" />
          </NavLink>
          <NavLink
            className="block hover:bg-gray-200 p-2 rounded-md transition-all"
            to="campaigns"
          >
            <FlagIcon className="size-9" />
          </NavLink>
          <NavLink
            className="block hover:bg-gray-200 p-2 rounded-md transition-all"
            to="profile"
          >
            <UsersIcon className="size-9" />
          </NavLink>
          {/* <NavLink className="block" to="/">Dashboard</NavLink> */}
        </nav>
        <Link className="hover:bg-gray-200 p-2 rounded-md transition-all">
          <ChatBubbleLeftEllipsisIcon className="size-9" />
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
