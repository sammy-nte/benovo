import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openMenu, closeMenu } from "../redux/redux-features/menuSlice";
import { toast } from "react-toastify";
import { Button } from "../components/shared";
import CategoriesCard from "../components/Home/CategoriesCard";

function Home() {
  const { menu } = useSelector(store => store.menu);
  console.log(menu);
  const dispatch = useDispatch();
  return (
    <div>
      <section id="banner" className="h-[500px] bg-tempColor mx-auto" />
      <section className="flex flex-col items-center justify-around mt-14 w-[90%] max-w-[1200px] mx-auto lg:flex-row">
        <img src="../images/img.jpg" alt="" width="500" />
        <div className="flex flex-col h-full bg-slate-300 mt-3 justify-evenly items-center w-[90%] lg:mt-0 lg:w-[50%] lg:items-start lg:justify-between">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold">Welcome to Giver</h3>
            <h3>We are lorem ipsum</h3>
          </div>
          <p className="font-light pb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            blanditiis ab consequuntur qui odit aliquam ad enim possimus minus
            error! Culpa quo pariatur praesentium ipsam laboriosam corporis
            tempore, harum itaque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            blanditiis ab consequuntur qui odit aliquam ad enim possimus minus
            error! Culpa quo pariatur praesentium ipsam laboriosam corporis
            tempore, harum itaque.
          </p>
          <Button btnText="Learn More" />
        </div>
      </section>
      <section>
        <h3>our platform seeks to help in the following categories</h3>
        <div>
          <CategoriesCard />
        </div>
      </section>
    </div>
  );
}

export default Home;
