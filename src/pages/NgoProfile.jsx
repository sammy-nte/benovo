import React, { useEffect, useState } from "react";
import { getNgoInfo } from "../loaders/loader";
import { useLoaderData, useParams } from "react-router-dom";
import { FacebookSvg, InstagramSvg, TwitterSvg } from "../components/Svgs/Svgs";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import CashCard from "../components/shared/DonationsCard/CashCard";

export async function loader({ params }) {
  return new Promise(async (resolve, reject) => {
    try {
      const ngoInfo = await getNgoInfo(params.ngoId);
      resolve(ngoInfo);
    } catch (error) {
      reject(error);
    }
  });
}

const getRandomProjects = (campaignData, count = 3) => {
  if (campaignData.length <= count) {
    return campaignData;
  }

  const results = [];
  while (results.length < count) {
    const randomIndex = Math.floor(Math.random() * campaignData.length);
    const data = campaignData[randomIndex];
    if (!results.some(item => item.campaignTitle === data.campaignTitle)) {
      results.push(data);
    }
  }

  return results;
};

function NgoProfile() {
  // const params = useParams();
  const profileInfo = useLoaderData();
  const [expand, setExpand] = useState(false);
  const [expandActiveCampaigns, setExpandActiveCampaigns] = useState(false);
  const [expandCompletedCampaigns, setExpandCompletedCampaigns] = useState(
    false
  );
  const [activeFeaturedProjects, setActiveFeaturedProjects] = useState([]);
  const [activeCampaignData, setActiveCampaignData] = useState([]);
  const [completedFeaturedProjects, setCompletedFeaturedProjects] = useState(
    []
  );
  const [completedCampaignData, setCompletedCampaignData] = useState([]);

  useEffect(
    () => {
      if (profileInfo && profileInfo.length > 0) {
        const { activeCampaigns, completedCampaigns } = profileInfo[0];
        if (activeCampaigns) {
          setActiveCampaignData(activeCampaigns);
        }
        if (completedCampaigns) {
          setCompletedCampaignData(completedCampaigns);
        }
      }
    },
    [profileInfo]
  );

  useEffect(
    () => {
      const activeFeatured = getRandomProjects(activeCampaignData);
      const completedFeatured = getRandomProjects(completedCampaignData);

      setActiveFeaturedProjects(activeFeatured);
      setCompletedFeaturedProjects(completedFeatured);
    },
    [activeCampaignData, completedCampaignData]
  );

  const activeCards = expandActiveCampaigns
    ? activeCampaignData.map((items, index) =>
        <CashCard key={items.id} items={items} index={index} />
      )
    : activeFeaturedProjects.map((items, index) =>
        <CashCard key={items.id} items={items} index={index} />
      );

  const completedCards = expandCompletedCampaigns
    ? completedCampaignData.map((items, index) =>
        <CashCard
          completed={true}
          key={items.campaignTitle}
          items={items}
          index={index}
        />
      )
    : completedFeaturedProjects.map((items, index) =>
        <CashCard
          completed={true}
          key={items.campaignTitle}
          items={items}
          index={index}
        />
      );

  // console.log(profileInfo);
  return (
    <div className="bg-red-">
      <section
        className="h-[320px] bg-no-repeat bg-cover bg-left-top"
        style={{
          backgroundImage: `url('../../public/images/profile_bg.jpg')`
        }}
      />
      <section className="max-w-[1200px] bg-green-40 mx-auto -translate-y-24 rounded-xl ">
        <section className="w-full md:h-[180px] bg-white border rounded-xl p-4">
          <div className="flex justify-between">
            <div className="flex">
              <div
                style={{
                  backgroundImage: `url(${profileInfo[0].logo_image})`
                }}
                className="w-[100px] h-[100px] bg-purple-300 bg-center bg-cover"
              />
              <div className="px-2">
                <h2 className="font-medium text-textColor">
                  {profileInfo[0].name}
                </h2>
                <p className="font-light">
                  We design delightful digital experiences
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowUpdateForm(true);
              }}
              className="w-[110px] h-8 bg-red-500 mr-2 rounded-md text-white font-medium text-sm hover:bg-red-400"
            >
              Report
            </button>
          </div>
          <div className="hidden md:flex max-w-[1000px] mx-auto mt-1 justify-between">
            <div className="text-center">
              <h3 className="font-medium text-textColor">Website</h3>
              {profileInfo[0].website
                ? <a
                    href={profileInfo[0].website}
                    target="_blank"
                    className="text-tempColor font-medium underline underline-offset-3"
                  >
                    web link
                  </a>
                : <p>N/A</p>}
            </div>
            <div className="text-center">
              <h3 className="font-medium text-textColor">Location</h3>
              <p>
                {profileInfo[0].location}
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-textColor">Company Type</h3>
              <p>NGO</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-textColor">Socials</h3>
              <div className="flex justify-between bg-red-20 items-center">
                <a
                  href={profileInfo[0].socials.facebook}
                  target="_blank"
                  className="mx-2"
                >
                  <FacebookSvg width="25px" extraStyles="" />
                </a>
                <a
                  href={profileInfo[0].socials.instagram}
                  target="_blank"
                  className="mx-2"
                >
                  <InstagramSvg width="30px" extraStyles="" />
                </a>
                <a
                  href={profileInfo[0].socials.twitter}
                  target="_blank"
                  className="mx-2"
                >
                  <TwitterSvg width="26px" extraStyles="" />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-pink-20 flex justify-between items-center md:hidden">
            <Menu>
              <MenuButton className="inline-flex items-center rounded-md border-2 py-[.2em] px-3  focus:outline-none data-[hover]:bg-gray-200 data-[open]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white transition-all">
                <Bars3Icon className="size-7 fill-black" />
              </MenuButton>
              <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <MenuItems
                  anchor="bottom end"
                  className="bg-white flex flex-col items-start ml-5 w-52 origin-top-right rounded-xl border-2 border-slate-200 p-1 mt-3 text-sm/6 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                >
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <div className="text-center">
                      <h3 className="pl-2 text-gray-500">Website</h3>
                      <a
                        href={profileInfo[0].website}
                        target="_blank"
                        className="pl-2 -mt-2 block text-tempColor font-medium underline underline-offset-3"
                      >
                        web link
                      </a>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div>
                      <h3 className="pl-2 text-gray-500">Socials</h3>
                      <div className="flex w-[150px] justify-between bg-red-00 items-center">
                        <a
                          href={profileInfo[0].socials.facebook}
                          target="_blank"
                          className="mx-2"
                        >
                          <FacebookSvg width="25px" extraStyles="" />
                        </a>
                        <a
                          href={profileInfo[0].socials.instagram}
                          target="_blank"
                          className="mx-2"
                        >
                          <InstagramSvg width="30px" extraStyles="" />
                        </a>
                        <a
                          href={profileInfo[0].socials.twitter}
                          target="_blank"
                          className="mx-2"
                        >
                          <TwitterSvg width="26px" extraStyles="" />
                        </a>
                      </div>
                    </div>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
            {/* <div className="flex w-[120px] justify-between bg-red-00 items-center">
            <a
              href={profileInfo[0].socials.facebook}
              target="_blank"
              className="mx-2"
            >
              <FacebookSvg width="25px" extraStyles="" />
            </a>
            <a
              href={profileInfo[0].socials.instagram}
              target="_blank"
              className="mx-2"
            >
              <InstagramSvg width="30px" extraStyles="" />
            </a>
            <a
              href={profileInfo[0].socials.twitter}
              target="_blank"
              className="mx-2"
            >
              <TwitterSvg width="26px" extraStyles="" />
            </a>
          </div> */}
            {profileInfo[0].location}
          </div>
        </section>
        <section className="w-full bg-purple-30 flex flex-col items-center">
          <div
            className={`bg-yellow-30 font-light w-[90%] mx-auto mt-7 overflow-hidden p-2 md:w-[80%] ${expand
              ? "h-auto"
              : "h-32"}`}
          >
            <h3 className="text-textColor font-medium pt-7 text-center md:text-left">
              About {profileInfo[0].name}
            </h3>
            <p className="">
              {profileInfo[0].about}
            </p>
            <h3 className="text-textColor font-medium pt-7 text-center md:text-left">
              Mission
            </h3>
            <p>
              {profileInfo[0].mission}
            </p>
            <h3 className="text-textColor font-medium pt-7 text-center md:text-left">
              Vision
            </h3>
            <p>
              {profileInfo[0].vision}
            </p>
          </div>
          <button
            onClick={() => {
              setExpand(prevState => !prevState);
            }}
            className="w-[130px] mt-4 h-8 bg-white border-2 border-tempColor mr-2 rounded-md text-tempColor font-medium text-sm hover:bg-tempColor hover:text-white transition-all"
          >
            {expand ? "Read Less" : "Read More"}
          </button>
        </section>
        <section className="mt-8 flex flex-col items-center">
          <h3 className="text-center my-4 font-medium text-lg">
            Active Campaigns
          </h3>
          <div className="grid grid-cols-1 place-items-center gap-5 md:grid-cols-3 bg-white p-4 rounded-2xl">
            {activeCards}
          </div>
          <button
            onClick={() => {
              setExpandActiveCampaigns(prevState => !prevState);
            }}
            className="w-[130px] mt-8 h-8 bg-white border-2 border-tempColor mr-2 rounded-md text-tempColor font-medium text-sm hover:bg-tempColor hover:text-white transition-all"
          >
            {expandActiveCampaigns ? "View Less" : "View More"}
          </button>
        </section>
        <section className="mt-8 flex flex-col items-center">
          <h3 className="text-center my-4 font-medium text-lg">
            Completed Campaigns
          </h3>
          {completedCards.length > 0
            ? <div className="grid grid-cols-1 gap-5  md:grid-cols-3 bg-white p-4 rounded-2xl">
                {completedCards}
              </div>
            : <div className="w-[600px] h-32 border-4 border-dashed grid place-content-center">
                <p className="text-gray-500 text-xl">
                  There are currently no complete campaigns
                </p>
              </div>}
          {completedCards.length > 1 &&
            <button
              onClick={() => {
                setExpandCompletedCampaigns(prevState => !prevState);
              }}
              className="w-[130px] mt-8 h-8 bg-white border-2 border-tempColor mr-2 rounded-md text-tempColor font-medium text-sm hover:bg-tempColor hover:text-white transition-all"
            >
              {expandCompletedCampaigns ? "View Less" : "View More"}
            </button>}
        </section>
      </section>
    </div>
  );
}

export default NgoProfile;
