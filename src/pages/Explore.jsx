import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FilterSvg, SearchSvg } from "../components/Svgs/Svgs";
import { setSearchQuery } from "../redux/redux-features/searchSlice";
import CashCard from "../components/shared/DonationsCard/CashCard";
import { useForm } from "react-hook-form";

function Explore() {
  const { projectData } = useSelector(store => store.projects);
  const [scrollPosition, setScrollPosition] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({});
  const onSubmit = data => {
    navigate(`/search?query=${data.search}`);
  };
  // function handleSearchInput(e) {
  //   e.preventDefault();
  //   dispatch(setSearchQuery(inputValue));
  // }

  // function handleInputChange(e) {
  //   const { value } = e.target;
  //   setInputValue(value);
  // }

  useEffect(
    () => {
      const handleScroll = () => {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        setScrollPosition(scrollTop);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    [scrollPosition]
  );

  const cards =
    projectData &&
    projectData.map((items, index) =>
      <CashCard key={items.id} items={items} index={index} />
    );

  const bg = {
    backgroundColor: scrollPosition > 665 ? "white" : "transparent"
  };

  const display = {
    display: scrollPosition > 665 ? "none" : "flex"
  };

  return (
    <div>
      <section className="">
        <div className="relative px-6 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            />
          </div>
          <div className="mx-auto max-w-containerMax py-32 sm:py-48 lg:py-20">
            <div className="text-center flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold tracking-tight text-textColor sm:text-3xl">
                Search campaigns on Benevo
              </h1>
              <p className="mt-6 text-lg leading-8 text-textColor font-light">
                Find campaigns by location, title, keyword, or a NGO’s name
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-4 w-full max-w-[330px] mx-auto mt-3"
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
            </form>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            />
          </div>
        </div>
      </section>
      {projectData.length > 0
        ? <section className="mt-5 bg-pink-20 grid grid-cols-3  gap-8 place-items-center max-w-containerMax mx-auto">
            {cards}
          </section>
        : <section className="mt-5 bg-pink-20 grid place-content-center max-w-containerMax mx-auto">
            <div className="w-[600px] h-32 border-4 border-dashed grid place-content-center">
              <p className="text-gray-500 text-xl">
                There are currently no campaigns
              </p>
            </div>
          </section>}
    </div>
  );
}

export default Explore;
