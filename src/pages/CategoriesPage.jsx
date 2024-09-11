import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimalSvg, CommunitySvg, EducationSvg, EnvironmentSvg, MedicalSvg, OthersSvg, WhatsappSvg } from "../components/Svgs/Svgs";

const categories = [
  { name: "Medical", icon: <MedicalSvg width="70px" /> },
  { name: "Education", icon: <EducationSvg width="70px" /> },
  { name: "Animal", icon: <AnimalSvg width="70px" /> },
  { name: "Environment", icon: <EnvironmentSvg width="70px" /> },
  { name: "Community", icon: <CommunitySvg width="70px" /> },
  { name: "Others", icon: <OthersSvg width="70px" /> }
];

function CategoriesPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Browse campaigns by category
        </h1>
        <p className="text-gray-500 mb-8">
          People everywhere are coming together to support the causes they
          believe in.
        </p>
        <Link to="/explore">
          <button className="w-[140px] h-8 bg-tempColor mr-2 rounded-md text-white font-medium text-sm hover:scale-110 transition-all">
            Make a donation
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        {categories.map((category, index) =>
          <div
            onClick={() => {
              navigate(`/categories/${category.name}`);
            }}
            key={index}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition hover:border hover:border-tempColor"
          >
            {category.icon}
            <span className="text-lg font-medium text-gray-700 pt-10">
              {category.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;
