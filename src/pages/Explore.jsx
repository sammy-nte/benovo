import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FilterSvg, SearchSvg } from "../components/Svgs/Svgs";
import { setSearchQuery } from "../redux/redux-features/searchSlice";
import CashCard from "../components/shared/DonationsCard/CashCard";

function Explore() {
  const { projectData } = useSelector(store => store.projects);
  const [scrollPosition, setScrollPosition] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

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

  const cards = projectData && projectData.map((items, index) =>
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
          <div className="mx-auto max-w-containerMax py-32 sm:py-48 lg:py-56">
            <div className="text-center flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold tracking-tight text-textColor sm:text-3xl">
                Search through our numerous projects
              </h1>
              <p className="mt-6 text-lg leading-8 text-textColor font-light">
                Explore our project in detail and discover all the exciting
                features and innovative solutions we have developed!
              </p>
              <form className="w-[100%] p-1 flex mt-5 items-center border-2 rounded-full justify-between md:w-[700px]">
                <button
                  // onClick={handleSearchInput}
                  className="w-[50px] h-[50px] grid place-content-center rounded-full border-2 text-textColor font-medium ml-1 bg-tempColor transition-all hover:scale-110"
                >
                  <SearchSvg width="30px" />
                </button>
                <div className="w-[90%] relative rounded-full overflow-hidden">
                  <input
                    placeholder="Search..."
                    className="relative bg-transparent ring-0 outline-none  text-neutral-900 placeholder-violet-700 text-xl rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                    type="text"
                    // onChange={handleInputChange}
                    // value={inputValue}
                  />
                </div>
              </form>
            </div>
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
      {scrollPosition > 460 &&
        <section
          style={bg}
          className="w-full bg-white sticky top-[48px] h-[60px] mx-auto flex justify-evenly items-center"
        >
          <form className="w-[70%] p-1 flex items-center border-2 rounded-full justify-between h-[50px] lg:w-[50%]">
            <button
              // onClick={handleSearchInput}
              className="w-[40px] h-[40px] grid place-content-center rounded-full border-2 text-textColor font-medium ml-1 bg-tempColor transition-all hover:scale-110"
            >
              <SearchSvg width="20px" />
            </button>
            <div className="w-[90%] relative rounded-full overflow-hidden">
              <input
                placeholder="Search..."
                className="relative bg-transparent ring-0 outline-none  text-neutral-900 placeholder-violet-700 text-xl rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                type="text"
                // onChange={handleInputChange}
                // value={inputValue}
              />
            </div>
          </form>
          <button className="w-[100px] h-[30px] rounded-lg flex items-center justify-center border-2 font-medium ml-1 text-tempColor border-tempColor transition-all">
            <FilterSvg width="20px" stroke="rgba(103,128,255,1)" />
            Filter
          </button>
          {/* <div className="w-[260px] mr-4 flex space-x-2 select-none">
          <label className="h-[40px] flex flex-grow items-center justify-center rounded-lg cursor-pointer border-2 border-tempColor">
          <input
          type="radio"
          name="type-radio"
          value="material"
          className="peer hidden"
          />
          <span className="h-[40px] w-full grid place-content-center tracking-widest peer-checked:bg-tempColor  peer-checked:text-white text-gray-700 rounded-lg transition duration-150 ease-in-out">
          Material
          </span>
          </label>
          
          <label className="h-[40px] flex flex-grow items-center justify-center rounded-lg cursor-pointer border-2 border-tempColor">
          <input
          type="radio"
          name="type-radio"
          value="monetary"
          className="peer hidden"
          />
          <span className="h-[40px] w-full grid place-content-center tracking-widest peer-checked:bg-tempColor peer-checked:text-white text-gray-700 rounded-lg transition duration-150 ease-in-out">
          Monetary
          </span>
          </label>
          </div> */}
        </section>}
      <section className="mt-5 bg-pink-20 grid grid-cols-4 gap-8 place-items-center max-w-containerMax mx-auto">
        {cards}
      </section>
    </div>
  );
}

export default Explore;
