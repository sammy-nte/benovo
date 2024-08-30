import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalData } from "../redux/redux-features/modalDataSlice";
import { openMenu } from "../redux/redux-features/donateForm";

function ProjectModal() {
  const { modalData } = useSelector(store => store.modalData);
  const dispatch = useDispatch();
  const ngoProfile = modalData.ngo;

  const navigateToNgoProfile = ngoProfileId => {
    window.location.assign(`/ngo-profile/${ngoProfileId}`);
  };

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
        <section>
          <div className="flex justify-between p-3">
            <div>
              <h2 className="font-bold">
                {modalData.organization}
              </h2>
              <p className="underline">
                {modalData.campaignTitle}
              </p>
              <p>
                {modalData.location}
              </p>
              <button
                onClick={() => {
                  navigateToNgoProfile(ngoProfile);
                }}
                className="my-2 w-[100px] h-8 border-tempColor border-2 mr-2 rounded-md text-textColor  font-medium text-sm hover:bg-tempColor hover:text-white transition-all"
              >
                View Profile
              </button>
              
            </div>
            <button
              onClick={() => {
                dispatch(setModalData(null));
              }}
              className="bg-tempColor text-white font-bold w-16 rounded-sm h-8"
            >
              Close
            </button>
          </div>
          <section className="overflow-auto flex flex-col gap-3 lg:flex-row lg:justify-around">
            <div className="w-full lg:max-w-[550px] border rounded">
              <div className="bg-violetLight">
                <h3 className="font-bold text-white p-2">Backstory</h3>
              </div>
              <div className="p-3">
                <p>
                  {modalData.backstory}
                </p>
              </div>
              <div className="bg-violetLight">
                <h3 className="font-bold text-white p-2">Goal</h3>
              </div>
              <div className="p-3">
                <p>
                  {modalData.goal}
                </p>
              </div>
              <div className="bg-violetLight">
                <h3 className="font-bold text-white p-2">Project Type</h3>
              </div>
              <div className="p-3">
                <p className="capitalize">
                  {modalData.campaignType}
                </p>
              </div>
              {modalData.campaignType === "monetary"
                ? <div className="bg-violetLight">
                    <h3 className="font-bold text-white p-2">
                      Current Progress
                    </h3>
                  </div>
                : ""}
              {modalData.campaignType === "monetary"
                ? <div className="p-3 flex justify-between">
                    <div>
                      <h3 className="font-bold">Target Amount</h3>
                      <ul className="px-3">
                        <li className="list-disc">
                          Ghc {modalData.targetAmount}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold">Current Amount</h3>
                      <ul className="px-3">
                        <li className="list-disc">
                          Ghc {modalData.currentAmount}
                        </li>
                      </ul>
                    </div>
                  </div>
                : ""}
              <hr />
            </div>
            <div className="w-full h-fit lg:max-w-[550px] border rounded">
              <div className="bg-violetLight">
                <h2 className="font-bold text-white p-2">Contact Info</h2>
              </div>
              <div className="px-3">
                <ul className="p-3">
                  <li className="list-disc">
                    Email: {modalData.contactInfo.email}
                  </li>
                  <li className="list-disc">
                    Phone:{" "}
                    <a href={`tel:${modalData.contactInfo.phone}`}>
                      {modalData.contactInfo.phone}
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              {modalData.campaignType === "material" &&
                <div>
                  <div className="bg-violetLight">
                    <h2 className="font-bold text-white p-2">
                      Want to donate money instead?
                    </h2>
                  </div>
                  <div className="px-3">
                    <button
                      onClick={() => {
                        window.location.href = "https://paystack.com/pay/myngo";
                      }}
                      className="my-4 w-[100px] h-8 bg-tempColor mr-2 rounded-md text-white font-medium text-sm"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>}
            </div>
          </section>
          <div className="flex w-[70%] mx-auto justify-evenly mt-8">
            {/* <Link
              className="w-[40%]   h-[40px] rounded-md border-none text-white text-sm bg-violet font-semibold lg:w-[300px] grid place-content-center"
              to="internship-application"
            >
              <button>Apply Now</button>
            </Link> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProjectModal;
