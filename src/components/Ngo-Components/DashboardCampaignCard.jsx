import React from "react";
import { useDispatch } from "react-redux";
import { setCampaignEdit } from "../../redux/redux-features/campaignEditSlice";

function DashboardCampaignCard({ data }) {
  const dispatch = useDispatch();

  // console.log(data);
  return (
    <div className="w-[86%]  gap-3  rounded-lg overflow border-2 outlin outline-lime-600  xl:w-[92%] flex flex-col justify-between h-[100%]">
      {/* <div className="px-6 py-4 bg-white">
              <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded-full float-right">
                6 DAYS LEFT
              </span>
               max-w-sm
            </div> */}

      <img
        src={data.campaignImage} // Update the path to your actual image path
        // alt="Children in Cellevon Village"
        className="w-full h-[220px] object-cover rounded-lg lg:h-[140px]"
      />
      <div className="relative bg-geen-200 h-[78px] flex flex-col justify-between">
        {/* <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                GOAL REACHED
              </span> */}
        <p className="font-medium text-sm px-2">
          {data.campaignTitle}
        </p>
        <div className="flex">
          <button
            onClick={() => {
              dispatch(setCampaignEdit(data));
            }}
            className="w-[34%] mx-auto border-tempColor border h-[30px] flex items-center justify-center rounded-md cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-100 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-tempColor before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md  hover:before:left-0 hover:text-white text-textColor font-medium lg:h[30px]"
          >
            Edit
          </button>
          <button
            onClick={() => {
              dispatch(setCampaignEdit(data));
            }}
            className="w-[34%] mx-auto border-tempColor border h-[30px] flex items-center justify-center rounded-md cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-100 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-tempColor before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md  hover:before:left-0 hover:text-white text-textColor font-medium lg:h[30px]"
          >
            Details
          </button>
        </div>
      </div>
      {data.campaignType === "monetary"
        ? <div className="grid grid-cols-3 gap-2 bg-gray-100 border-t-2 rounded-br-lg rounded-bl-lg ">
            <div className="text-center b-yellow-200 px-1">
              <p className="text-gray-700 text-sm">Raised</p>
              <p className="font-medium text-base">
                ₵{data.currentAmount}
              </p>
            </div>
            <div className="text-center b-yellow-200 px-1">
              <p className="text-gray-700 text-sm">Goals</p>
              <p className="font-medium text-base">
                ₵{data.targetAmount}
              </p>
            </div>
            <div className="text-center g-yellow-200  px-1 text-wrap">
              <p className="text-gray-700 text-sm">Left</p>
              <p className="font-medium text-base ">
                ₵{data.targetAmount - data.currentAmount}
              </p>
            </div>
          </div>
        : <div className="flex justify-around items-center">
            <p className="font-medium text-center py-2">
              Items gotten: {data.itemsGotten}
            </p>
            <button className="bg-tempColor font-light h-[26px] grid place-content-center p-2 text-white rounded-sm transition duration-200 ease-in-out hover:bg-violetLight active:bg-purple-900 focus:outline-none">
              View Items
            </button>
          </div>}
    </div>
  );
}

export default DashboardCampaignCard;
