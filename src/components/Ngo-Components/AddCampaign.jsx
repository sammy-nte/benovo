import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  doc,
  collection,
  setDoc,
  addDoc,
  arrayUnion
} from "firebase/firestore";

function AddCampaign({ setAddCampaign }) {
  const { uid, email } = useSelector(store => store.ngo);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      campaignType: "monetary",
      targetAmount: 0
    }
  });
  const campaignType = watch("campaignType");
  const onSubmit = async data => {
    const date = new Date();
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };

    const campaignImageUrl = async campaignId => {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `NGOs/${uid}/campaigns/${campaignId}/${data.campaignImage[0].name}`
      );
      await uploadBytes(storageRef, data.campaignImage[0]);
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    };

    function createCampaignData(data, imageUrl) {
      const baseCampaignData = {
        organization: "Clean Oceans",
        campaignTitle: data.campaignTitle,
        campaignType: data.campaignType,
        backstory: data.backstory,
        goal: data.goal,
        location: data.campaignLocation,
        startDate: date.toLocaleDateString("en-CA", options),
        views: 0,
        ngo: uid,
        campaignImage: imageUrl,
        contactInfo: {
          email: email,
          phone: data.telephone
        }
      };

      if (data.campaignType === "monetary") {
        return {
          ...baseCampaignData,
          targetAmount: Number(data.targetAmount),
          currentAmount: 0
        };
      } else if (data.campaignType === "material") {
        return {
          ...baseCampaignData,
          itemsGotten: 0
        };
      }
    }

    try {
      const newCampaignRef = doc(collection(db, "campaign"));
      const newCampaignId = newCampaignRef.id;

      // Upload the image and get the URL
      const imageUrl = await campaignImageUrl(newCampaignId);

      // Create campaign data with the image URL
      const campaignData = createCampaignData(data, imageUrl);
      // Add the generated ID to the campaign data
      const campaignWithId = {
        ...campaignData,
        id: newCampaignId
      };

      // Add the campaign data to the 'Campaigns' array field in the NGO document
      const ngoDocRef = doc(db, "NGOs", uid);
      await setDoc(
        ngoDocRef,
        {
          activeCampaigns: arrayUnion(campaignWithId)
        },
        { merge: true }
      );
      await addDoc(collection(db, "ActiveCampaigns"), {
        ...campaignWithId
      });
      toast.success("Campaign posted successfully");
    } catch (error) {
      console.error("Error adding campaign:", error);
      toast.error("Campaign failed to post: " + error.message);
    }
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ["image/png", "image/jpeg"];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.warn("Only PNG and JPEG files are allowed!");
        event.target.value = "";
      } else if (file.size > maxSizeInBytes) {
        toast.warn("File size exceeds the 2MB limit!");
        event.target.value = "";
      }
    }
  };

  return (
    <div className="bg-[#f6f6f6] w-full h-[90vh] overflow-y-auto ">
      <div className="flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            New Campaign
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
                htmlFor="campaignType"
                className="text-base font-semibold leading-7 text-gray-900 -mb-6"
              >
                Campaign Type
              </label>
              <div className="mt-2">
                <select
                  {...register("campaignType")}
                  id="campaignType"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="monetary">Monetary</option>
                  <option value="material">Material</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {campaignType === "monetary" &&
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <div className="col-span-full">
                  <label
                    htmlFor="campaignImage"
                    className="text-base font-semibold leading-7 text-gray-900"
                  >
                    Campaign Image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="campaignImage"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <input
                            {...register("campaignImage", {
                              onChange: handleFileChange
                            })}
                            type="file"
                            id="campaignImage"
                            accept="image/png, image/jpeg"
                            // onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, up to 2MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => {
                setAddCampaign(false);
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
  );
}

export default AddCampaign;
