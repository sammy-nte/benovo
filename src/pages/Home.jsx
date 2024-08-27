import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openMenu, closeMenu } from "../redux/redux-features/menuSlice";
import { toast } from "react-toastify";
import { Button } from "../components/shared";
import CategoriesCard from "../components/Home/CategoriesCard";
import WorksCard from "../components/Home/WorksCard";
import CashCard from "../components/shared/DonationsCard/CashCard";
import { addProject } from "../redux/redux-features/projectSlice";
import { Link } from "react-router-dom";
import {
  BookSvg,
  CloseMenuSvg,
  ClothSvg,
  InfiniteSvg,
  PlasterSvg
} from "../components/Svgs/Svgs";
import CardSkeleton from "../components/shared/CardSkeleton";

// const CashCard = React.lazy(() => import("../components/shared/DonationsCard/CashCard"));

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const { projectData } = useSelector(store => store.projects);
  const { menu } = useSelector(store => store.menu);

  // console.log(projectData.length)

  useEffect(
    () => {
      if (projectData && projectData.length > 0) {
        let results = [];
        while (results.length < 3) {
          const randomIndex = Math.floor(Math.random() * projectData.length);
          let data = projectData[randomIndex];
          if (!results.some(item => item.id === data.id)) {
            results.push(data);
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
          <div className="mx-auto max-w-containerMax  py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Make a Difference: Connect with NGOs Transforming Lives in Ghana
              </h1>
              <p className="mt-6 text-lg leading-8 text-textColor font-light">
                Join us in transforming lives, one donation at a time. Our
                platform seeks to bring NGOs under one roof, enabling us to make
                a significant impact on the communities in Ghana. Together, we
                can help them achieve their dreams and create a brighter future.
              </p>
              {/* <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="ngo-profile/eqWoQPuC5JSILLXWj7LFTVLu21Q2"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </Link>
                <Link
                  to="about"
                  className="text-sm font-semibold leading-6 text-gray-900 px-3.5 py-2 rounded-lg border-tempColor border-[1px] "
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div> */}
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

        <div className="mt-3 bg-slate-30 text-center">
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
        </div>
      </section>
      <section className=" max-w-containerMax mx-auto mt-20">
        <h3 className="text-center text-2xl capitalize font-semibold pt-3 pb-11 px-5">
          our platform seeks to help in the following categories
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
          How to Use Benevo as a Donor
        </h3>
        <WorksCard
          opposites={true}
          number="01"
          title="Discover"
          subTitle="Browse through various NGOs and projects."
          text="Browse through a diverse array of NGOs and projects, each with a unique mission to make a difference. Discover inspiring initiatives spanning education, healthcare, environmental conservation, and more."
        />
        <WorksCard
          opposites={false}
          number="02"
          title="Donate"
          subTitle="Choose a cause and make a donation."
          text="Choose a cause close to your heart and make a secure donation directly through our platform. Whether it's a one-time contribution or recurring support, your generosity fuels impactful projects and drives real change."
        />
        <WorksCard
          opposites={true}
          number="03"
          title="Impact"
          subTitle="See the positive changes your contributions make"
          text="Witness the power of your contributions. Track the progress of projects you've supported and see the difference your donations are making in the lives of individuals and communities. "
        />
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
        />
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
      <section className="mt-10">
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
      </section>
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
    </div>
  );
}

export default Home;
