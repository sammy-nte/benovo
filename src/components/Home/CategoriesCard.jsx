import React from "react";
import { Link } from "react-router-dom";

function CategoriesCard({ backgroundColor, text, pageLink, svg }) {
  const backgroundStyle = {
    background: backgroundColor
  };
  const ifPageLinkStyle = {
    alignSelf: pageLink ? "start" : "center",
    textAlign: pageLink ? 'left' : 'center'
  };
  return (
    <div
      style={backgroundStyle}
      className="mx-8 w-[80%] shadow-md h-[150px] rounded-lg flex flex-col items-center sm:w-[400px] lg:w-[280px]"
    >
      <div className="w-[65px] h-[65px] bg-[rgb(250,251,252)] rounded-full translate-y-[-50%] shadow-md grid place-items-center" >{svg}</div>
      <div style={ifPageLinkStyle} className="w-[70%] self-start ml-4 max-1000:!text-center max-1000:w-[90%] ">
        <h3 className="font-bold">
          {text}
        </h3>
        {/* {pageLink
          ? <Link
              to={pageLink}
              className="text-[rgba(220,90,58,0.95)] font-semibold"
            >
              More Details...
            </Link>
          : ""} */}
      </div>
    </div>
  );
}

export default CategoriesCard;
