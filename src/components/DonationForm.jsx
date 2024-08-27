import React from "react";

function DonationForm() {
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-950 bg-opacity-40 z-10 backdrop-blur-sm ">
      <div className="bg-white w-full h-full lg:w-[1200px] lg:h-[500px] overflow-y-auto  shadow-lg rounded-lg p-3">
        <div className="text-center">
          <h3 className="px-5 font-medium">
            <span className="before:block before:absolute before:-inset-1 before:bg-blue-500 relative inline-block">
              <span className="relative text-white">Benevo</span>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default DonationForm;
