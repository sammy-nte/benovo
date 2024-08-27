import React from "react";
import { BookSvg } from "../Svgs/Svgs";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon
} from "@heroicons/react/16/solid";
import {
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { Bars2Icon, Bars3Icon } from "@heroicons/react/24/solid";
import { signOut, getAuth } from "firebase/auth";
import { app } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const auth = getAuth(app)

function PageHeader() {
  const navigate = useNavigate()

  function signOutBtn() {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Signed Out")
      console.log("a")
      localStorage.removeItem("in")
      navigate("/sign-in")
    }).catch((error) => {
      // An error happened.
      toast.error("Error signing out")
    });
 
  }
  return (
    <div className="flex justify-between p-3 bg-can-400 items-center">
      <div className=" lg:ml-4">
        <h3 className="px-5 font-medium">
          <span className="before:block before:absolute before:-inset-1 before:bg-blue-500 relative inline-block">
            <span className="relative text-white">Benevo</span>
          </span>
        </h3>
      </div>
      <div className="hidden lg:flex items-center">
        {/* <button className="w-[100px] h-8 bg-tempColor mr-2 rounded-md text-white font-medium text-sm">
          New Campaign
        </button> */}
        <Popover>
          <PopoverButton className="text-sm/6 font-semibold text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
            <BellIcon className="size-7 mx-5" />
          </PopoverButton>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom"
              className="divide-y mt-4 divide-white/5 rounded-xl bg-tempColor text-sm/6 [--anchor-gap:var(--spacing-5)]"
            >
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Insights</p>
                  <p className="text-white/50">
                    Measure actions your users take
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Automations</p>
                  <p className="text-white/50">
                    Create your own targeted content
                  </p>
                </a>
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Reports</p>
                  <p className="text-white/50">Keep track of your growth</p>
                </a>
              </div>
              <div className="p-3">
                <a
                  className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                  href="#"
                >
                  <p className="font-semibold text-white">Documentation</p>
                  <p className="text-white/50">
                    Start integrating products and tools
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
        <Menu>
          <MenuButton className="inline-flex w-[100px] items-center gap-2 rounded-md border-2 py-[.2em] px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-200 data-[open]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white transition-all">
            <div className="w-[35px] h-[35px] bg-red-400 rounded-full" />
            <ChevronDownIcon className="size-4 fill-black/60" />
          </MenuButton>
          <Transition
            enter="transition ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <MenuItems
              anchor="bottom end"
              className="bg-tempColor w-52 origin-top-right rounded-xl border border-white/5 p-1 mt-3 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
            >
              <div className="my-1 h-px bg-white/5" />
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  <Cog6ToothIcon className="size-4 opacity-60" />
                  Settings
                </button>
              </MenuItem>
              <MenuItem>
                <button onClick={signOutBtn} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  <ArrowRightEndOnRectangleIcon className="size-4 opacity-60" />
                  Log out
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
      <div className="lg:hidden">
      <Menu>
          <MenuButton className="inline-flex items-center rounded-md border-2 py-[.2em] px-3  focus:outline-none data-[hover]:bg-gray-200 data-[open]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white transition-all">
            <Bars3Icon className="size-7 fill-black" />
          </MenuButton>
          <Transition
            enter="transition ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <MenuItems
              anchor="bottom end"
              className="bg-tempColor w-52 origin-top-right rounded-xl border border-white/5 p-1 mt-3 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
            >
              <div className="my-1 h-px bg-white/5" />
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  <Cog6ToothIcon className="size-4 opacity-60" />
                  Settings
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  <ArrowRightEndOnRectangleIcon className="size-4 opacity-60" />
                  Log out
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default PageHeader;
