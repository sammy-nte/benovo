import { Link, NavLink } from "react-router-dom";
import { OpenMenuSvg } from "./Svgs/Svgs";
import { useDispatch } from "react-redux";
import { openMenu } from "../redux/redux-features/menuSlice";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
function PageHeader() {
  const dispatch = useDispatch();
  return (
    <header className="flex justify-between p-2 h-20 items-center z-40 bg-[#e7dffa] lg:max-w-[1100px] lg:mt-16 rounded-full mx-auto">
      <div className="flex gap-8 ml-7">
        <button className="border-tempColor border-2 px-2 rounded-md text-tempColor font-bold flex items-center group hover:bg-tempColor hover:text-white transition-all">
          <MagnifyingGlassIcon className="size-5 fill-tempColor pr-1 group-hover:fill-white transition-all" />{" "}
          Search
        </button>
        <Popover>
          <PopoverButton className="flex items-center text-sm/6 font-semibold text-tempColor focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-white">
            Donate <ChevronDownIcon className="size-4 fill-tempColor" />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y divide-white/5 rounded-xl bg-white/90  border-2 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="p-3">
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
                href="#"
              >
                <p className="font-semibold text-tempColor">Categories</p>
                <p className="text-tempColor/70">
                  Browse campaigns by categories
                </p>
              </a>
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
                href="#"
              >
                <p className="font-semibold text-tempColor">NGOs</p>
                <p className="text-tempColor/70">Browse campaigns by NGOs</p>
              </a>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
      <Link to="/">
        <h3 className="px-5 font-medium">
          <span className="before:block before:rounded-md before:absolute before:-inset-1 before:bg-blue-500 relative inline-block">
            <span className="relative text-white text-2xl">Benevo</span>
          </span>
        </h3>
      </Link>
      <div className="flex gap-8 mr-7 items-center">
        <Popover>
          <PopoverButton className="flex items-center text-sm/6 font-semibold text-tempColor focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-white">
            About <ChevronDownIcon className="size-4 fill-tempColor" />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y divide-white/5 rounded-xl bg-white border-2 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="p-3">
              <Link
                className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
                to="about"
              >
                <p className="text-tempColor/90">More about Benevo</p>
              </Link>
              <Link
                className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
                to="contact"
              >
                <p className="text-tempColor/90">Contact</p>
              </Link>
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
                href="/#how-to-use"
              >
                <p className="text-tempColor/90">How to use Benevo</p>
              </a>
              <Link
                className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
                to="#"
              >
                <p className="text-tempColor/90">Benevo for NGOs</p>
              </Link>
            </div>
          </PopoverPanel>
        </Popover>
        <Link to="register">
          <button className="w-[100px] h-8 bg-tempColor  rounded-md text-white font-medium text-sm hover:scale-110 transition-all">
            Join Benevo
          </button>
        </Link>
      </div>

      <OpenMenuSvg
        width="35px"
        fill="black"
        controlMenu={() => {
          dispatch(openMenu());
        }}
      />
    </header>
  );
}

export default PageHeader;
