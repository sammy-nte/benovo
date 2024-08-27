import React from "react";

function MaterialCard() {
  return (
    <div className="w-[90%] shadow-md rounded-md lg:w-[330px]">
      <div className="w-full h-44">
        <img
          className="h-full w-full rounded-md object-cover"
          src="../public/images/img.jpg"
          alt=""
        />
      </div>
      <div className="w-[90%] mx-auto">
        <div className="my-3 w-[100px] bg-cyan-600 h-6 text-center rounded-md text-white font-semibold relative left-[194px]">
          <p>Material</p>
        </div>
        <h3 className="font-semibold">Provide clothing and food items</h3>
        <p className="font-semibold text-gray-500 text-sm pb-3">
          The Helper Foundation
        </p>
        <button className="my-4 w-[100px] h-8 bg-tempColor mr-2 rounded-md text-white font-medium text-sm">
          Donate Now
        </button>
      </div>
    </div>
  );
}

export default MaterialCard;
