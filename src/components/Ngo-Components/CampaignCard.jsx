import React from "react";
import { useDispatch } from "react-redux";
import { setModalData } from "../../redux/redux-features/modalDataSlice";
// import { setModalData } from "../../../redux/redux-features/modalDataSlice";
setModalData

function CampaignCard({ items, index }) {
  const {
    organization,
    campaignTitle,
    campaignType,
    targetAmount,
    currentAmount,
    campaignImage
  } = items;
  const style = {
    display: campaignType === "monetary" ? "block" : "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  };

  // console.log(index)

  const widthPercentage = currentAmount / targetAmount * 100;
  const barStyle = {
    width: `${widthPercentage}%`
  };

  const dispatch = useDispatch()
  return (
    <div className={"w-[90%] mx-8 shadow-md border-[2px] rounded-md flex flex-col justify-between items-center p-3 lg:w-[330px] lg:h-[480px]"}>
      <div className="w-[95%] h-44">
        <img
          className="h-full w-full rounded-2xl object-cover"
          src={campaignImage}
          alt=""
        />
      </div>
      <div className="w-[95%] mx-auto flex flex-col h-[44%]">
        <div className="my-3 w-[100px] bg-cyan-600 h-6 text-center rounded-md text-white font-light capitalize">
          <p>
            {campaignType}
          </p>
        </div>
        <h3 className="font-semibold capitalize">
          {campaignTitle}
        </h3>
        <p className="text-gray-500 text-sm pb-3">
          {organization}
        </p>
        {campaignType === "monetary"
          ? <div className="w-full bg-gray-200 h-3 mb-3 rounded-full">
              <div
                style={barStyle}
                className=" bg-blue-500 h-full rounded-full"
              />
            </div>
          : ""}
        {campaignType === "monetary"
          ? <div>
              <p className="font-semibold">
                Target Amount: ${targetAmount}
              </p>
              <p className="text-gray-500 ">
                Amount Raised: ${currentAmount}
              </p>
            </div>
          : ""}
      </div>
      <div className="w-[90%] mx-auto flex justify-between">
        <button className="my-4 w-[100px] h-8 bg-red-600 mr-2 rounded-md text-white font-medium text-sm">
          De-Activate
        </button>
        <button
          onClick={() => {
            dispatch(setModalData(items))
          }}
          className="my-4 w-[100px] h-8 border-tempColor border-2 mr-2 rounded-md text-textColor  font-medium text-sm"
        >
          More Details
        </button>
      </div>
    </div>
  );
}

export default CampaignCard;
