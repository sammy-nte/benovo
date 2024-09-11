import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {  doc, setDoc } from "firebase/firestore";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";


function NgoSignUp() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userID = userCredential.user.uid;

      const storage = getStorage()
      const storageRef = ref(storage, `NGOs/${userID}/${data.logoUpload[0].name}`)

      await uploadBytes(storageRef, data.logoUpload[0])
      const imageUrl = await getDownloadURL(storageRef)

        // Create NGO document
        await setDoc(doc(db, "NGOs", userID), {
            name: data.ngoName,
            id: userID,
            logo_image: imageUrl,
            contact_info: {
              email: data.email,
              phone_number: data.telephone
            },
            mission: data.mission,
            vision: data.vision,
            about: data.about,
            socials: {
              facebook: data.facebook || '',
              instagram: data.instagram || '',
              twitter: data.twitter || ''
            },
            todaysDonation: 0,
            totalDonation: 0,
            activeCampaigns: [],
            completedCampaigns: [],
            donors: []
          });

      console.log("NGO document created successfully");
      toast.success("Account created successfully");
        navigate("/sign-in")
    } catch (error) {
      console.error("Error creating NGO account:", error);
      toast.error("Failed to create account");
    }
  };

  const [next, setNext] = useState(false)
  const [ivalue, setIvalue] = useState()

  function ontoNext(data){
    if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
        } else{
          setNext(true)
        }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['image/png', 'image/jpeg'];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.warn('Only PNG and JPEG files are allowed!');
        event.target.value = ''; // Clear the input
      } else if (file.size > maxSizeInBytes) {
        toast.warn('File size exceeds the 2MB limit!');
        event.target.value = ''; // Clear the input
      } else {
        setIvalue(file)
      }
    }
  };


  const bgImage = {
    background: ivalue ? `url(${URL.createObjectURL(ivalue)})` : ''
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
        <h3 className="px-5 font-medium">
          <span className="before:block before:absolute before:-inset-1 before:bg-blue-500 relative inline-block">
            <span className="relative text-white">Benevo</span>
          </span>
        </h3>   
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      {!next && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit(ontoNext)}>
          <div>
            <label
              htmlFor="ngoName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Ngo Name
            </label>
            <div className="mt-2">
              <input
                {...register('ngoName', {required: 'Name is required'})}
                id="ngoName"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.ngoName?.message &&     
            <p className="text-red-400 text-sm pt-3">{errors.ngoName?.message}!</p>
            }
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register('email', {required: 'Email is required'})}
                id="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email?.message &&     
            <p className="text-red-400 text-sm pt-3">{errors.email?.message}!</p>
            }
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
              {...register('password', {required:'Password is required'})}
                id="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password?.message &&     
            <p className="text-red-400 text-sm pt-3">{errors.password?.message}!</p>
            }
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
              {...register('confirmPassword', {required:'Password is required'})}
                id="confirmPassword"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.confirmPassword?.message &&     
            <p className="text-red-400 text-sm pt-3">{errors.confirmPassword?.message}!</p>
            }
          </div>
          

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Next
            </button>
          </div>
        </form>
      </div>}


{next && 
      <form className="max-w-[1000px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly.
          </p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="telephone" className="text-base font-semibold leading-7 text-gray-900 -mb-6">
                Telephone
              </label>
              <div className="mt-2">
                <input
                {...register("telephone", {required: 'This field is required'})}
                  type="tel"
                  id="telephone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
            </div>
      <div className="border-b border-gray-900/10 pb-12">
       


          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900 -mb-6">Socials</h2>
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="facebook" className="text-base font-semibold leading-7 text-gray-900">
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
              <label htmlFor="instagram" className="text-base font-semibold leading-7 text-gray-900">
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
              <label htmlFor="twitter" className="text-base font-semibold leading-7 text-gray-900">
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
              <label htmlFor="about" className="text-base font-semibold leading-7 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  {...register('about', {required: 'This field is required'})}
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              {errors.about?.message && <p className="text-red-400 text-sm pt-3">{errors.about?.message}!</p>}
              {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
            </div>
            <div className="col-span-full">
              <label htmlFor="mission" className="text-base font-semibold leading-7 text-gray-900">
                Mission
              </label>
              <div className="mt-2">
                <textarea
                {...register("mission", {required: 'This field is required'})}
                  id="mission"
                  name="mission"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              {errors.mission?.message && <p className="text-red-400 text-sm pt-3">{errors.mission?.message}!</p>}
              {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
            </div>
            <div className="col-span-full">
              <label htmlFor="vision" className="text-base font-semibold leading-7 text-gray-900">
                Vision
              </label>
              <div className="mt-2">
                <textarea
                {...register("vision", {required: 'This field is required'})}
                  id="vision"
                  name="vision"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              {errors.vision?.message && <p className="text-red-400 text-sm pt-3">{errors.vision?.message}!</p>}
              {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="text-base font-semibold leading-7 text-gray-900">
                Ngo Logo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="logoUpload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <input {...register("logoUpload", {required: 'Logo is required'})} type="file" id="logoUpload" name="logoUpload" accept="image/png, image/jpeg" onChange={handleFileChange} />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, up to 2MB</p>
                </div>
              </div>
              {errors.logoUpload?.message && <p className="text-red-400 text-sm pt-3">{errors.logoUpload?.message}!</p>}
            </div>
            {/* <div className="col-span-full">
              <label htmlFor="cover-photo" className="text-base font-semibold leading-7 text-gray-900">
                Banner photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="banner-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                    <input {...register("bannerUpload")} type="file" id="banner-upload" name="banner-upload" accept="image/png, image/jpeg" onChange={handleFileChange} />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, up to 10MB</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign Up
        </button>
      </div>
    </form> 
}
    </div>
  );
}

export default NgoSignUp;
