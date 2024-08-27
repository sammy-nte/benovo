import React from "react";
import { useForm } from "react-hook-form";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { regions } from "../Temp";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../redux/redux-features/donateForm";
import {
  arrayUnion,
  collection,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  increment
} from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

function MaterialDonation() {
  const dispatch = useDispatch();
  const { materialForm } = useSelector(store => store.donateForm);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const regionOptions = regions.map(region =>
    <option key={region} value={region}>
      {region}
    </option>
  );
  const dmethod = watch("dmethod");

  const onSubmit = async data => {
    let donorData = {
      name: data.name,
      email: data.email,
      number: data.tel,
      region: data.region,
      dmethod: data.dmethod,
      donationType: "material",
      materialItem: data.materialItem,
      info: data.info
    };
    if (data.dmethod === "drop-off") {
      donorData = {
        ...donorData,
        dropLocation: data.dropLocation
      };
    } else {
      donorData = {
        ...donorData,
        address: data.address
      };
    }

    try {
      const batch = writeBatch(db);

      // Reference to the NGO document
      const ngoRef = doc(db, "NGOs", materialForm[0].ngo);
      batch.update(ngoRef, {
        donors: arrayUnion(donorData),
        todaysDonation: increment(1),
        totalDonation: increment(1)
      });

      // Fetch the NGO document to get activeCampaigns
      const ngoSnapShot = await getDoc(ngoRef);
      const ngoData = ngoSnapShot.data();
      const activeCampaigns = ngoData.activeCampaigns;

      // Update the relevant campaign
      const campaignIndex = activeCampaigns.findIndex(
        campaign => campaign.id === materialForm[0].id
      );
      if (campaignIndex !== -1) {
        const current = activeCampaigns[campaignIndex].donors || [];
        activeCampaigns[campaignIndex] = {
          ...activeCampaigns[campaignIndex],
          donors: [...current, donorData],
          todaysDonation:
            (activeCampaigns[campaignIndex].todaysDonation || 0) + 1,
          totalDonation: (activeCampaigns[campaignIndex].totalDonation || 0) + 1
        };
        batch.update(ngoRef, { activeCampaigns });
      }

      // Update the relevant active campaigns
      const activeCampaignsCollectionRef = collection(db, "ActiveCampaigns");
      const q = query(
        activeCampaignsCollectionRef,
        where("id", "==", materialForm[0].id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(docSnapshot => {
        const docRef = doc(db, "ActiveCampaigns", docSnapshot.id);
        batch.update(docRef, {
          donors: arrayUnion(donorData),
          todaysDonation:
            (activeCampaigns[campaignIndex].todaysDonation || 0) + 1,
          totalDonation: (activeCampaigns[campaignIndex].totalDonation || 0) + 1
        });
      });

      // // Commit the batch
      await batch.commit();
      toast.success("Donation made successfully");
      dispatch(closeMenu());
    } catch (error) {
      toast.error("A problem occurred");
      console.error("Error updating documents:", error);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="">
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("name")}
                      id="name"
                      type="text"
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="tel"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Number
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("tel")}
                      id="tel"
                      type="tel"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Region
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("region")}
                      id="region"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {regionOptions}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="dmethod"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Donation Method
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("dmethod")}
                      id="dmethod"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="pick-up">Pick-Up</option>
                      <option value="drop-off">Drop-Off</option>
                    </select>
                  </div>
                </div>
                {dmethod === "drop-off"
                  ? <div className="sm:col-span-2">
                      <label
                        htmlFor="dropLocation"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Drop-Off Locations
                      </label>
                      <div className="mt-2">
                        <select
                          {...register("dropLocation")}
                          id="dropLocation"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value="united-states">United States</option>
                          <option value="canada">Canada</option>
                          <option value="mexico">Mexico</option>
                        </select>
                      </div>
                    </div>
                  : <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("address")}
                          id="address"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>}
                {/* <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="donationType"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Material Items
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("materialItem")}
                      id="materialItem"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="clothes">Clothes</option>
                      <option value="furniture">Furniture</option>
                      <option value="electronics">Electronics</option>
                      <option value="supplies">Supplies</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="tel"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Extra Information
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("info")}
                      id="info"
                      type="info"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div> */}

                {/* <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      id="street-address"
                      name="street-address"
                      type="text"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => {
                dispatch(closeMenu());
              }}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MaterialDonation;
