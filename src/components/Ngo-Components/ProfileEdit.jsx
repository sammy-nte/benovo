import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, db } from "../../config/firebase";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { update } from "firebase/database";
import Loaders from "../shared/Loaders";
import { useSelector } from "react-redux";

function ProfileEdit({ setShowUpdateForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {uid} = useSelector(store => store.ngo)
  const onSubmit = async data => {
    try {
      setIsLoading(true);
      const updates = {};

      if (data.telephone) {
        updates.telephone = data.telephone;
      }
      if (data.name) {
        updates.name = data.name;
      }
      if (data.website) {
        updates.website = data.website;
      }
      if (data.location) {
        updates.location = data.location;
      }
      if (data.facebook) {
        if (!updates.socials) {
          updates.socials = {};
        }
        updates.socials.facebook = data.facebook;
      }
      if (data.instagram) {
        if (!updates.socials) {
          updates.socials = {};
        }
        updates.socials.instagram = data.instagram;
      }
      if (data.twitter) {
        if (!updates.socials) {
          updates.socials = {};
        }
        updates.socials.twitter = data.twitter;
      }

      if (data.mission) {
        updates.mission = data.mission;
      }
      if (data.vision) {
        updates.vision = data.vision;
      }
      if (data.about) {
        updates.about = data.about;
      }

      if (data.logoUpload && data.logoUpload.length > 0) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `NGOs/${uid}/${data.logoUpload[0].name}`
        );
        await uploadBytes(storageRef, data.logoUpload[0]);
        const imageUrl = await getDownloadURL(storageRef);
        updates.logo_image = imageUrl;
      }

      if (Object.keys(updates).length > 0) {
        const ngoDocRef = doc(db, "NGOs", uid);
        await updateDoc(ngoDocRef, updates);
        toast.success("Profile updated successfully");
      } else {
        toast.info("No changes to update");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
      setShowUpdateForm(false)
      window.location.reload(true)
    }
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ["image/png", "image/jpeg"];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.warn("Only PNG and JPEG files are allowed!");
      } else if (file.size > maxSizeInBytes) {
        toast.warn("File size exceeds the 2MB limit!");
        event.target.value = ""; 
      }
    }
  };

  return (
    <>
      {isLoading
        ? <Loaders />
        : <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Update Profile
              </h2>
            </div>

            <form
              className="max-w-[1000px] mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="text-base font-semibold leading-7 text-gray-900 -mb-6"
                  >
                    Ngo Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="website"
                    className="text-base font-semibold leading-7 text-gray-900 -mb-6"
                  >
                    Website
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("website")}
                      type="url"
                      id="website"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="location"
                    className="text-base font-semibold leading-7 text-gray-900 -mb-6"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("location")}
                      type="text"
                      id="location"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <h2 className="text-base font-semibold leading-7 text-gray-900 -mb-6">
                    Socials
                  </h2>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="facebook"
                      className="text-base font-semibold leading-7 text-gray-900"
                    >
                      Facebook
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("facebook")}
                        type="url"
                        id="facebook"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="instagram"
                      className="text-base font-semibold leading-7 text-gray-900"
                    >
                      Instagram
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("instagram")}
                        type="url"
                        id="instagram"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="twitter"
                      className="text-base font-semibold leading-7 text-gray-900"
                    >
                      Twitter
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("twitter")}
                        type="text"
                        id="twitter"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="text-base font-semibold leading-7 text-gray-900"
                      >
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          {...register("about")}
                          id="about"
                          name="about"
                          rows={3}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="mission"
                        className="text-base font-semibold leading-7 text-gray-900"
                      >
                        Mission
                      </label>
                      <div className="mt-2">
                        <textarea
                          {...register("mission")}
                          id="mission"
                          name="mission"
                          rows={3}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="vision"
                        className="text-base font-semibold leading-7 text-gray-900"
                      >
                        Vision
                      </label>
                      <div className="mt-2">
                        <textarea
                          {...register("vision")}
                          id="vision"
                          name="vision"
                          rows={3}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="logoUpload"
                        className="text-base font-semibold leading-7 text-gray-900"
                      >
                        Ngo Logo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="logoUpload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <input
                                {...register("logoUpload")}
                                type="file"
                                id="logoUpload"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
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
                    setShowUpdateForm(false);
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
                  Update
                </button>
              </div>
            </form>
          </div>}
    </>
  );
}

export default ProfileEdit;
