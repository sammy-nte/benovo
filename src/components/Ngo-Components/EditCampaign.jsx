import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCampaignEdit } from "../../redux/redux-features/campaignEditSlice";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch
} from "firebase/firestore";
import { db } from "../../config/firebase";

function EditCampaign() {
  const dispatch = useDispatch();
  const { editCampaign } = useSelector(store => store.campaignEdit);
  const { uid } = useSelector(store => store.ngo);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {}
  });
  const onSubmit = async data => {
    const updates = {};
    if (data.campaignTitle) updates.campaignTitle = data.campaignTitle;
    if (data.campaignLocation) updates.campaignLocation = data.campaignLocation;
    if (data.telephone) {
      updates.contactInfo = {
        ...editCampaign.contactInfo,
        phone: data.telephone 
      };
    }
    if (data.backstory) updates.backstory = data.backstory;
    if (data.goal) updates.goal = data.goal;

    if (Object.keys(updates).length === 0) {
      toast.info("No changes to update");
      return;
    }

    try {
      const batch = writeBatch(db);
      const ngoDocRef = doc(db, "NGOs", uid);

      const ngoSnapShot = await getDoc(ngoDocRef);
      if (!ngoSnapShot.exists()) {
        toast.error("NGO document not found");
        return;
      }

      const ngoData = ngoSnapShot.data();
      const activeCampaigns = ngoData.activeCampaigns || [];
      const campaignIndex = activeCampaigns.findIndex(
        campaign => campaign.id === editCampaign.id
      );

      if (campaignIndex !== -1) {
        activeCampaigns[campaignIndex] = {
          ...activeCampaigns[campaignIndex],
          ...updates
        };
        batch.update(ngoDocRef, { activeCampaigns });
      } else {
        toast.error("Campaign not found in NGO document");
        return;
      }

      const activeCampaignsCollectionRef = collection(db, "ActiveCampaigns");
      const q = query(
        activeCampaignsCollectionRef,
        where("id", "==", editCampaign.id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        batch.update(docRef, updates);
      } else {
        toast.info("Campaign not found in ActiveCampaigns collection");
      }

      await batch.commit();
      toast.success("Campaign updated successfully");
    } catch (error) {
      toast.error("Failed to update campaign");
      console.error(error);
    }
  };

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-950 bg-opacity-40 z-10 backdrop-blur-sm ">
      <div className="bg-white w-full h-full lg:w-[1200px] lg:h-[500px] overflow-y-auto  shadow-lg rounded-lg p-3">
        <div className="lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Edit Campaign
            </h2>
          </div>

          <form className=" mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="campaignTitle"
                  className="text-base font-semibold leading-7 text-gray-900 -mb-6"
                >
                  Campaign Title
                </label>
                <div className="mt-2">
                  <input
                    {...register("campaignTitle")}
                    type="text"
                    id="campaignTitle"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="telephone"
                  className="text-base font-semibold leading-7 text-gray-900 -mb-6"
                >
                  Telephone
                </label>
                <div className="mt-2">
                  <input
                    {...register("telephone")}
                    type="tel"
                    id="telephone"
                    placeholder={`Current telephone: ${editCampaign.contactInfo
                      .phone}`}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {editCampaign.campaignType === "monetary" &&
                <div className="sm:col-span-3">
                  <label
                    htmlFor="targetAmount"
                    className="text-base font-semibold leading-7 text-gray-900 -mb-6"
                  >
                    Target Amount
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("targetAmount")}
                      min="0"
                      type="number"
                      id="targetAmount"
                      placeholder={`Current Amount '${editCampaign.targetAmount}'`}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>}

              <div className="sm:col-span-3">
                <label
                  htmlFor="campaignLocation"
                  className="text-base font-semibold leading-7 text-gray-900 -mb-6"
                >
                  Campaign Location
                </label>
                <div className="mt-2">
                  <input
                    {...register("campaignLocation")}
                    type="text"
                    id="campaignLocation"
                    placeholder={`Current location: ${editCampaign.location}`}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="backstory"
                      className="text-base font-semibold leading-7 text-gray-900"
                    >
                      Backstory
                    </label>
                    <div className="mt-2">
                      <textarea
                        {...register("backstory")}
                        id="backstory"
                        rows={3}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="goal"
                      className="text-base font-semibold leading-7 text-gray-900"
                    >
                      Goal
                    </label>
                    <div className="mt-2">
                      <textarea
                        {...register("goal")}
                        id="goal"
                        rows={3}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={() => {
                  dispatch(setCampaignEdit(null));
                }}
                type="button"
                className="w-2/4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCampaign;
