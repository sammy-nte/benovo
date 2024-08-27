import React from "react";

function WorksCard({ title, subTitle, text, number, opposites }) {
  const reverseStyle = {
    flexDirection: opposites ? "row-reverse" : "row"
  };
  return (
    <div
      style={reverseStyle}
      className={`${number === "03"
        ? "border-b-0"
        : "border-b-2"} max-w-[1000px] mx-auto flex flex-col pb-5 lg:pb-0 max-1000:!flex-col`}
    >
      <div className="w-[100%] lg:w-1/2 ">
        <p className="tt">
          {number}
        </p>
      </div>
      <div className="w-[100%] lg:w-1/2 px-4 mt-[-2em] grid place-content-center lg:px-0 lg:p-4 lg:mt-0">
        <div className="text-center lg:text-left">
          <h2 className="font-bold text-2xl">
            {title}
          </h2>
          <h4 className="font-semibold pb-3">
            {subTitle}
          </h4>
          <p className="font-light text-gray-500 ">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WorksCard;
