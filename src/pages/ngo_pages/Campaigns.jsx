import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardCampaignCard from "../../components/Ngo-Components/DashboardCampaignCard";
import AddCampaign from "../../components/Ngo-Components/AddCampaign";
import { requireAuth } from "../../config/requireAuth";
import { onAuthStateChanged } from "firebase/auth";
import { getNgoInfo } from "../../loaders/loader";
import { auth } from "../../config/firebase";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  await requireAuth();
  return new Promise(async (resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const savedData = await getNgoInfo(user.uid);
          unsubscribe();
          resolve(savedData);
        } catch (error) {
          reject(error);
        }
      } else {
        console.log("nothing");
        resolve(null);
      }
    });
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


function Campaigns() {
  const [showCampaigns, setShowCampaigns] = useState([]);
  const [addCampaign, setAddCampaign] = useState(false);
  const [expandActiveCampaigns, setExpandActiveCampaigns] = useState(false);
  const [expandCompletedCampaigns, setExpandCompletedCampaigns] = useState(
    false
  );
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [activeFeaturedProjects, setActiveFeaturedProjects] = useState([]);
  const [activeCampaignData, setActiveCampaignData] = useState([]);
  const [completedCampaignData, setCompletedCampaignData] = useState([]);
  const [completedFeaturedProjects, setCompletedFeaturedProjects] = useState(
    []
  );
  const profileInfo = useLoaderData()
  console.log(profileInfo[0].activeCampaigns)

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
  

  // const cards = cardList.map(item => <DonorList key={item.name} data={item} />);
  const Dcards = showCampaigns.map(item =>
    <DashboardCampaignCard key={item.id} data={item} />
  );

  const activeCards = expandActiveCampaigns
  ? activeCampaignData.map((items, index) =>
      <DashboardCampaignCard key={items.campaignTitle} data={items} index={index} />
    )
  : activeFeaturedProjects.map((items, index) =>
      <DashboardCampaignCard key={items.campaignTitle} data={items} index={index} />
    );
const completedCards = expandActiveCampaigns
  ? completedCampaignData.map((items, index) =>
      <DashboardCampaignCard
        completed={true}
        key={items.campaignTitle}
        data={items}
        index={index}
      />
    )
  : completedFeaturedProjects.map((items, index) =>
      <DashboardCampaignCard
        completed={true}
        key={items.campaignTitle}
        data={items}
        index={index}
      />
    );
  return (
    <>
      {addCampaign
        ? <AddCampaign setAddCampaign={setAddCampaign} />
        : <section className="bg-slate-20 w-[1350px] mx-auto flex flex-col h-[100vh]">
            <button
              onClick={() => {
                setAddCampaign(true);
              }}
              className="w-[130px] h-8 bg-tempColor m-2 rounded-md text-white font-medium text-sm hover:bg-violetLight self-end"
            >
              Add Campaign
            </button>
            <section className="mt-8 flex flex-col items-center">
                <h3 className="text-center my-4 font-medium text-lg">
                  Active Campaigns
                </h3>
                {activeCards.length > 0
                  ? <div className="grid grid-cols-1 gap-5  md:grid-cols-3 bg-white p-4 rounded-2xl">
                      {activeCards}
                    </div>
                  : <div className="w-[600px] h-32 border-4 border-dashed grid place-content-center">
                      <p className="text-gray-500 text-xl">
                        There are currently no active campaigns
                      </p>
                    </div>}
                {activeCards.length > 1 &&
                  <button
                    onClick={() => {
                      setExpandActiveCampaigns(prevState => !prevState);
                    }}
                    className="w-[130px] mt-8 h-8 bg-white border-2 border-tempColor mr-2 rounded-md text-tempColor font-medium text-sm hover:bg-tempColor hover:text-white transition-all"
                  >
                    {expandActiveCampaigns ? "View Less" : "View More"}
                  </button>}
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
          </section>}
    </>
  );
}

export default Campaigns;
