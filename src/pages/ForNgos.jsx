import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoriesCard from "../components/Home/CategoriesCard";
import WorksCard from "../components/Home/WorksCard";
import CashCard from "../components/shared/DonationsCard/CashCard";
import { Link, useNavigate } from "react-router-dom";
import {
  BookSvg,
  ClothSvg,
  InfiniteSvg,
  PlasterSvg,
  EmailSvg,
  FacebookSvg,
  InstagramSvg,
  PhoneSvg,
  WhatsappSvg
} from "../components/Svgs/Svgs";
import CardSkeleton from "../components/shared/CardSkeleton";
// import { Link, useNavigate } from "react-router-dom";
import { OpenMenuSvg } from "../components/Svgs/Svgs";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";

// const CashCard = React.lazy(() => import("../components/shared/DonationsCard/CashCard"));

function ForNgos() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const { projectData } = useSelector(store => store.projects);
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({});

  const onSubmit = data => {
    navigate(`/search?query=${data.search}`);
  };

  // console.log(projectData.length)

  useEffect(
    () => {
      if (projectData && projectData.length > 0) {
        let results = [];

        if (projectData.length <= 3) {
          // If there are 3 or fewer projects, use them all
          results = projectData;
        } else {
          // If there are more than 3 projects, pick 3 unique random ones
          while (results.length < 3) {
            const randomIndex = Math.floor(Math.random() * projectData.length);
            let data = projectData[randomIndex];

            if (!results.some(item => item.id === data.id)) {
              results.push(data);
            }
          }
        }

        setFeaturedProjects(results);
      }
    },
    [projectData]
  );

  const cards = featuredProjects.map((items, index) =>
    <CashCard key={items.id} items={items} index={index} />
  );
  return (
    <div>
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
                  to="/categories"
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
                  to="/about"
                >
                  <p className="text-tempColor/90">More about Benevo</p>
                </Link>
                <Link
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
                  to="/contact"
                >
                  <p className="text-tempColor/90">Contact</p>
                </Link>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-200/70"
                  href="/for-ngos#how-to-use"
                >
                  <p className="text-tempColor/90">How to use Benevo</p>
                </a>
              </div>
            </PopoverPanel>
          </Popover>
          <Link to="/register">
            <button className="w-[90px] h-8 bg-tempColor  rounded-md text-white font-medium text-sm hover:scale-110 transition-all">
              Register
            </button>
          </Link>
          <Link to="/sign-in">
            <button className="w-[90px] h-8 bg-tempColor  rounded-md text-white font-medium text-sm hover:scale-110 transition-all">
              Login
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
      <section>
        <div className="relative px-6 pt-14 lg:px-8">
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
          <div className="mx-auto max-w-containerMax  py-32 sm:py-48 lg:py-11">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Create Your Campaign, Inspire Change
              </h1>
              <p className="mt-1 text-lg leading-8 text-textColor font-light">
                Take the first step toward making a difference—show the world
                the impact you want to create.
              </p>
              <Link to="/sign-in">
                <button className="mt-10 w-[140px] h-8 bg-tempColor mr-2 rounded-md text-white font-medium text-sm hover:scale-110 transition-all">
                  Create a campaign
                </button>
              </Link>
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
      <section className="flex flex-col items-center justify-around mt-14 w-[90%] max-w-[1200px] mx-auto lg:flex-row lg:items-stretch">
        {/* <img src="../images/img.jpg" alt="" width="500" /> */}

        {/* <div className="mt-3 bg-slate-30 text-center">
          <h3 className="font-medium text-2xl pb-4">
            <span className="before:block before:absolute before:-inset-1 before:bg-blue-500 relative inline-block">
              <span className="relative text-white">Benevo</span>
            </span>
          </h3>
          <div className="">
            <h3 className="text-4xl font-bold">Welcome to Benevo</h3>
            <h3 className="font-light pb-3">
              Empowering Change, One Donation at a Time
            </h3>
          </div>
          <p className="font-light pb-2 text-lg text-justify">
            At Benevo, we believe in the power of collective action. Our
            platform is designed to bridge the gap between passionate donors and
            visionary NGOs across Ghana. We strive to make philanthropy
            accessible, transparent, and rewarding for everyone involved. By
            bringing together a diverse range of causes under one roof, we aim
            to amplify the reach and impact of each NGO, fostering a community
            of giving and mutual support.
          </p>
          <Link to="about">
            <Button btnText="Learn More" />
          </Link>
        </div> */}
      </section>
      <section className=" max-w-containerMax mx-auto mt-20">
        <h3 className="text-center text-2xl capitalize font-semibold pt-3 pb-11 px-5">
          Create campaigns to help in the following categories
        </h3>
        <div className="flex flex-col gap-14 items-center lg:flex-row lg:gap-0 lg:justify-between">
          <CategoriesCard
            pageLink="a"
            text="Children Education"
            backgroundColor="rgb(202,228,247)"
            svg={<BookSvg width="50px" />}
          />
          <CategoriesCard
            pageLink="a"
            text="Good food and Clothing"
            backgroundColor="rgb(253,240,221)"
            svg={<ClothSvg width="40px" />}
          />
          <CategoriesCard
            pageLink="a"
            text="Medical treatment"
            backgroundColor="rgb(210,244,244)"
            svg={<PlasterSvg width="50px" />}
          />
          <CategoriesCard
            text="Many more.."
            backgroundColor="rgb(224,234,253)"
            svg={<InfiniteSvg width="40px" />}
          />
        </div>
      </section>
      <section className="mt-[100px] w-[90%] mx-auto">
        <h3 className="text-center text-2xl capitalize font-semibold pt-3 pb-11 px-5">
          How to Use Benevo as an NGO
        </h3>
        <WorksCard
          opposites={false}
          number="01"
          title="Register"
          subTitle="Join the Benevo platform and create your NGO profile."
          text="Sign up and create a detailed profile for your NGO. Share your mission, goals, and the communities you serve, giving donors a clear understanding of your organization's purpose and impact."
        >
          <Link to="/register">
            <button className="w-[90px] h-8 mt-5 bg-tempColor  rounded-md text-white font-medium text-sm hover:scale-110 transition-all">
              Register
            </button>
          </Link>
        </WorksCard>
        <WorksCard
          opposites={true}
          number="02"
          title="Create a Campaign"
          subTitle="Launch campaigns and share your initiatives."
          text="Create and manage campaigns for your projects. Clearly outline the objectives, budget, and expected outcomes. Use compelling descriptions to showcase the importance of your work and attract potential donors."
        />
        <WorksCard
          opposites={false}
          number="03"
          title="Get Donors on Board"
          subTitle="Get Donations to help your cause"
          text="Share your campaigns with the Benevo community and beyond. Keep donors updated with progress reports and stories of impact. Engage with them through messages and acknowledgments, fostering a strong and supportive network of contributors."
        />
      </section>
      {/* <section className="mt-10">
        <h2 className="text-center text-2xl capitalize font-semibold pt-3 pb-11 px-5">
          Featured Campaigns
        </h2>
        {featuredProjects.length > 0
          ? <div className="max-w-[1200px] mx-auto gap-8 grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-0">
              {cards}
            </div>
          : <div className="max-w-[600px] mx-auto flex items-center justify-between">
              <CardSkeleton />
              <CardSkeleton />
            </div>}
      </section> */}
      <section className="mt-24">
        <h2 className="text-center text-2xl font-semibold pt-3 px-5">
          Are you an NGO? You're in good company
        </h2>
        <div className="w-[90%] mx-auto lg:max-w-containerMax flex flex-col items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-light leading-8 text-gray-900">
              Trusted by top notch NGO'S
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
          <Link to="register">
            <button className="w-[100px] h-8 mt-6 bg-tempColor mr-2 rounded-md text-white font-medium text-sm text-center">
              Join us today
            </button>
          </Link>
        </div>
      </section>
      <div className="relative isolate overflow-hidden mt-32 pt-16 sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  max-w-2xl lg:max-w-none flex items-center justify-around">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-textColor sm:text-4xl">
                Subscribe to our newsletter.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-500 font-light">
                Join our newsletter for the latest on new projects and
                completions. Get exclusive updates and insights straight to your
                inbox. Sign up now and stay informed!
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border border-tempColor bg-white/5 px-3.5 py-2 text-textColor shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start p-2 w-[300px]">
              <h4 className="mt-4 font-semibold text-textColor">
                Get in touch
              </h4>
              <div className="w-fit">
                <ul className="text-gray-500">
                  <li className="flex text-lg font-light">
                    <PhoneSvg width="30px" /> +233204223551{" "}
                  </li>
                  <li className="flex text-lg font-light">
                    <EmailSvg width="30px" /> sammyntewusu@gmail.com
                  </li>
                </ul>
              </div>
              <h4 className="mt-4 font-semibold text-textColor">Socials</h4>
              <div className="flex w-[120px] justify-between">
                <FacebookSvg
                  link="https://web.facebook.com/login.php/?_rdc=1&_rdr"
                  width="30px"
                />
                <InstagramSvg link="https://www.instagram.com/" width="35px" />
                <WhatsappSvg link="https://wa.me/0257530839" width="35px" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
        <p className="text-center mt-12 md:text-xl">&copy; Benevo</p>
      </div>
    </div>
  );
}

export default ForNgos;
