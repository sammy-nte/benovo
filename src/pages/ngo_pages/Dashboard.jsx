import React, { useEffect, useState } from "react";
import DonorList from "../../components/Ngo-Components/DonorListC";
import DashboardCampaignCard from "../../components/Ngo-Components/DashboardCampaignCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { getNgoInfo } from "../../loaders/loader";
import { requireAuth } from "../../config/requireAuth";
import EmptyWarning from "../../components/Ngo-Components/EmptyWarning";
import { closeDetails } from "../../redux/redux-features/donorDetailSlice";

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

function Dashboard() {
  const [donorType, setDonorType] = useState("material");
  const [cardList, setCardList] = useState([]);
  const [showCampaigns, setShowCampaigns] = useState([]);
  const dispatch = useDispatch();
  const ngoInfo = useLoaderData();
  const { details } = useSelector(store => store.donorDetails);

  const MaterialBtn = {
    background: donorType === "material" ? "rgba(103,128,255,1)" : "white",
    color: donorType === "material" ? "white" : "rgb(55 ,65, 81)"
  };

  const MonetaryBtn = {
    background: donorType === "monetary" ? "rgba(103,128,255,1)" : "white",
    color: donorType === "monetary" ? "white" : "rgb(55 ,65, 81)"
  };

  // const emptyStyles = {
  //   display: "grid",
  //   placeContent: "center"
  // }

  useEffect(
    () => {
      if (ngoInfo && ngoInfo[0].donors) {
        const donors = ngoInfo[0].donors;
        if (donorType === "material") {
          const filteredList = donors.filter(
            item => item.donationType === "material"
          );
          setCardList(filteredList);
        } else if (donorType === "monetary") {
          const filteredList = donors.filter(
            item => item.donationType === "monetary"
          );
          setCardList(filteredList);
        }
      }
    },
    [donorType, ngoInfo]
  );

  useEffect(
    () => {
      if (
        ngoInfo &&
        ngoInfo.length > 0 &&
        ngoInfo[0].activeCampaigns.length > 0
      ) {
        const activeCampaigns = ngoInfo[0].activeCampaigns;
        let dashboardCampaignList = [];
        const loopAmount = Math.min(3, activeCampaigns.length); // Limit loopAmount to the length of activeCampaigns

        for (let i = 0; i < loopAmount; i++) {
          dashboardCampaignList.push(activeCampaigns[i]);
        }

        setShowCampaigns(dashboardCampaignList);
      } else {
        setShowCampaigns([]);
      }
    },
    [ngoInfo]
  );

  const cards = cardList.map(item => <DonorList key={item.name} data={item} />);
  const Dcards = showCampaigns.map(item =>
    <DashboardCampaignCard data={item} key={item.id} />
  );

  return (
    <div className="bg-pik-300 w-full lg:h-[90vh] lg:w-[94%] lg:mr-2">
      <div className="bg-yelow-100 mx-auto xl:max-w-[1400px] border- rounded-xl p-3 gap-4 xl:grid xl:grid-cols-5 xl:grid-rows-6">
        <div className="bg-blue-00 flex flex-col justify-between border- rounded-lg xl:row-span-3 xl:col-span-3">
          <div className="flex justify-between mb-8 px-5 xl:px-0 lg:mb-4 bg-red-00">
            <h3 className="font-medium">Your Campaigns</h3>
            <Link to="/ngo/campaigns" className="font-medium text-tempColor">
              See All Campaigns
            </Link>
          </div>
          {Dcards.length > 0
            ? <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-5 w-full lg:gap-0 lg:justify-between lg:h-[90%] bg-green-00">
                {Dcards}
              </div>
            : <EmptyWarning text="You have no campaigns" />}
        </div>
        <div className="bg-reen-200 w-[88%] md:w-[93%] lg:w-[95%] mx-auto mt-9 border-2 rounded-lg xl:mt-0 xl:w-full xl:mx-0 xl:col-start-4 xl:col-end-6 xl:row-span-3 lg:h-[350px]">
          <div className="bg-pink-40 flex justify-between p-2 items-center">
            <p className="font-bold text-textColor pl-3 ">Donors</p>
            <div className="">
              <button
                onClick={() => {
                  setDonorType("material");
                }}
                style={MaterialBtn}
                className="lg:w-[100px] bg-slate-4 shadow-md border-2 mx-1 rounded-md p-1 font-medium text-textColor hover:bg-tempColor hover:text-white transition-all hover:shadow-none"
              >
                Material
              </button>
              <button
                onClick={() => {
                  setDonorType("monetary");
                }}
                style={MonetaryBtn}
                className="lg:w-[100px] bg-slate-4 shadow-md border-2 mx-1 rounded-md p-1 font-medium  hover:bg-tempColor hover:text-white transition-all hover:shadow-none"
              >
                Monetary
              </button>
            </div>
          </div>
          {details
            ? <div className="w-[90%] h-[80%] grid grid-cols-2 mx-auto overflow-auto px-3">
                <strong>Name</strong>
                <p>
                  {details.name}
                </p>
                <strong>Number</strong>
                <p>
                  {details.number}
                </p>
                <strong>Donation Method</strong>
                <p>
                  {details.dmethod}
                </p>
                <strong>Region</strong>
                <p>
                  {details.region}
                </p>
                <strong>Address</strong>
                <p>
                  {details.address}
                </p>
                <strong>Material Item</strong>
                <p>
                  {details.materialItem}
                </p>
                <strong>Extra Information</strong>
                <p>
                  {details.info}
                </p>
                <button
                  onClick={() => {
                    dispatch(closeDetails());
                  }}
                  className="border-violetLight border-2 font-bold rounded-md col-span-2 hover:bg-tempColor hover:text-white transition-all"
                >
                  Close
                </button>
              </div>
            : <div className="w-[90%] h-[80%] flex flex-col mx-auto overflow-auto px-3">
                {donorType === "monetary" && cardList.length > 0
                  ? cards
                  : donorType === "material" && cardList.length > 0
                    ? cards
                    : <EmptyWarning text="No donations have been made" />}
              </div>}
        </div>
        <div className="bg-yellow-20 border-2 rounded-lg xl:col-span-3 xl:row-span-3">
          <p />
        </div>
        <div className="bg-pik-200 grid gap-5 place-items-center mt-8 grid-cols-2 rounded-lg md:grid-cols-3 xl:mt-0 xl:col-span-2 xl:row-span-3 xl:grid-cols-3 xl:place-items-center">
          {/* <div className="rounded-xl w-[150px] h-[130px] bg-gradient-to-tr from-white via-[#f8fefe] to-[#d7f4f7] border flex flex-col justify-around p-3 ">
            <BanknotesIcon className="size-8 " />
            <p className="font-medium text-textColor">Ghc 0</p>
            <p className="font-medium text-gray-400 text-sm -mt-2">
              Donations Today
            </p>
          </div> */}
          <div className="rounded-xl w-[150px] h-[130px] bg-gradient-to-tr from-white via-[#f8fefe] to-[#d7f4f7] border flex flex-col justify-around p-3 ">
            <CursorArrowRaysIcon className="size-8" />
            <p className="font-medium text-textColor">0</p>
            <p className="font-medium text-gray-400 text-sm -mt-2">
              Views Today
            </p>
          </div>
          <div className="rounded-xl w-[150px] h-[130px] bg-gradient-to-tr from-white via-[#f8fefe] to-[#d7f4f7] border flex flex-col justify-around p-3 ">
            <UsersIcon className="size-8" />
            <p className="font-medium text-textColor">
              {ngoInfo[0].todaysDonation}
            </p>
            <p className="font-medium text-gray-400 text-sm -mt-2">
              Donors Today
            </p>
          </div>
          {/* <div className="rounded-xl w-[150px] h-[130px] bg-gradient-to-tr from-white via-[#f8fefe] to-[#d7f4f7] border flex flex-col justify-around p-3 ">
            <BanknotesIcon className="size-8" />
            <p className="font-medium text-textColor">Ghc 0</p>
            <p className="font-medium text-gray-400 text-sm -mt-2">
              Total Donations
            </p>
          </div> */}
          <div className="rounded-xl w-[150px] h-[130px] bg-gradient-to-tr from-white via-[#f8fefe] to-[#d7f4f7] border flex flex-col justify-around p-3 ">
            <CursorArrowRaysIcon className="size-8" />
            <p className="font-medium text-textColor">o0</p>
            <p className="font-medium text-gray-400 text-sm -mt-2">
              Total Views
            </p>
          </div>
          <div className="rounded-xl w-[150px] h-[130px] bg-gradient-to-tr from-white via-[#f8fefe] to-[#d7f4f7] border flex flex-col justify-around p-3 ">
            <UsersIcon className="size-8" />
            <p className="font-medium text-textColor">
              {ngoInfo[0].totalDonation}
            </p>
            <p className="font-medium text-gray-400 text-sm -mt-2">
              Total Donors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
