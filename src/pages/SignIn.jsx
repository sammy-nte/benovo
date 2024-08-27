import React from "react";
import { useForm } from "react-hook-form";
import { app } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";

const auth = getAuth(app);

function SignIn() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  let [searchParams] = useSearchParams();
  const message  = searchParams.get("message")

  const onSubmit = async (data) => {
   await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("in", JSON.stringify(true))
        toast.success("Logged In")
        navigate("/ngo/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Error Signing In")
      });
  };



  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
        {message && <div className="absolute top-1 capitalize text-white font-bold rounded-lg w-fit p-3 bg-red-700"><p>{message}</p></div>}
        <h3 style={message ? {marginTop: '3em'} : {marginTop: '0'}} className="px-5 font-medium">
          <span className="before:block before:absolute before:-inset-1 before:bg-blue-500 relative inline-block">
            <span className="relative text-white">Benevo</span>
          </span>
        </h3>   
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
              {...register('password', {required:'Password is required'})}
                id="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password?.message &&     
            <p className="text-red-400 text-sm pt-3">{errors.password?.message}!</p>
            }
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
