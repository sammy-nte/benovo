import { Link, NavLink, useNavigate } from "react-router-dom";
import { OpenMenuSvg } from "./Svgs/Svgs";
import { useDispatch } from "react-redux";
import { openMenu } from "../redux/redux-features/menuSlice";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
function PageHeader() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({});

  const onSubmit = data => {
    navigate(`/search?query=${data.search}`);
  };

  return (
    <header className="flex justify-between p-2 h-20 items-center z-40">
      <div className="flex gap-8 ml-7 items-center">
        <button
          onClick={() => {
            setSearch(prevState => !prevState);
          }}
          className="border-tempColor border-2 px-2 rounded-md text-tempColor font-bold flex items-center group hover:bg-tempColor hover:text-white transition-all"
        >
          <MagnifyingGlassIcon className="size-5 fill-tempColor pr-1 group-hover:fill-white transition-all" />{" "}
          Search
        </button>
        {search &&
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 w-full max-w-[330px]"
          >
            <label
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              htmlFor="default-search"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                >
                  <path
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                  />
                </svg>
              </div>
              <input
                {...register("search")}
                placeholder="Search"
                className="block w-full ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="default-search"
                type="search"
              />
              <button
                type="submit"
                className="absolute end-2.5 bottom-1/2 translate-y-1/2 p-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>}
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
              <Link
                to="categories"
                className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
              >
                <p className="font-semibold text-tempColor">Categories</p>
                <p className="text-tempColor/70">
                  Browse campaigns by categories
                </p>
              </Link>
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
            </div>
          </PopoverPanel>
        </Popover>
        <Link to="for-ngos">
          <button className="w-[130px] h-8 bg-tempColor  rounded-md text-white font-medium text-sm hover:scale-110 transition-all">
            Benevo for NGOs
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
