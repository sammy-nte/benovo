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


function Campaigns() {
  const [showCampaigns, setShowCampaigns] = useState([]);
  const [addCampaign, setAddCampaign] = useState(false);
  // const { projectData } = useSelector(store => store.projects);
  const [expandActiveCampaigns, setExpandActiveCampaigns] = useState(false);
  const ngoInfo = useLoaderData()
  console.log(ngoInfo[0].activeCampaigns)

  useEffect(() => {
    if(ngoInfo && ngoInfo.length > 0 && ngoInfo[0].activeCampaigns.length > 0){
      const activeCampaigns = ngoInfo[0].activeCampaigns
      let dashboardCampaignList = [];
      const loopAmount = 4;
      while (dashboardCampaignList.length < loopAmount) {
        for (let i = 0; i < loopAmount; i++) {
          const element = activeCampaigns[i];
          dashboardCampaignList.push(element);
        }
      }
      setShowCampaigns(dashboardCampaignList);
    }
  }, [ngoInfo]);

  console.log(showCampaigns)

  // const cards = cardList.map(item => <DonorList key={item.name} data={item} />);
  const Dcards = showCampaigns.map(item =>
    // <DashboardCampaignCard key={item.id} data={item} />
    <p>a</p>
  );
  return (
    <>
      {addCampaign
        ? <AddCampaign setAddCampaign={setAddCampaign} />
        : <section className="bg-slate-200 w-[1350px] mx-auto flex flex-col h-[100vh]">
            <button
              onClick={() => {
                setAddCampaign(true);
              }}
              className="w-[130px] h-8 bg-tempColor m-2 rounded-md text-white font-medium text-sm hover:bg-violetLight self-end"
            >
              Add Campaign
            </button>
            <section className="flex flex-col">
              <h2 className="font-bold text-textColor text-xl p-3">
                Active Campaigns
              </h2>
              <div className=" bg-pink-30 grid grid-cols-1 place-items-center w-[98%] gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
                {Dcards}
              </div>
              <button
                onClick={() => {
                  setExpandActiveCampaigns(prevState => !prevState);
                }}
                className="w-[130px] mt-8 h-8 bg-white border-2 border-tempColor mr-2 rounded-md text-tempColor font-medium text-sm hover:bg-tempColor hover:text-white transition-all self-center"
              >
                {expandActiveCampaigns ? "View Less" : "View More"}
              </button>
            </section>
            <section className="mt-9 flex flex-col">
              <h2 className="font-bold text-textColor text-xl p-3">
                Completed Campaigns
              </h2>
              <div className=" bg-pink-30 flex justify-between w-[90%] gap-8 flex-wrap mx-auto">
                {/* {Dcards} */}
              </div>
              <button
                onClick={() => {
                  setExpandActiveCampaigns(prevState => !prevState);
                }}
                className="w-[130px] mt-8 h-8 bg-white border-2 border-tempColor mr-2 rounded-md text-tempColor font-medium text-sm hover:bg-tempColor hover:text-white transition-all self-center"
              >
                {expandActiveCampaigns ? "View Less" : "View More"}
              </button>
            </section>
          </section>}
    </>
  );
}

export default Campaigns;
