import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import CashCard from "../components/shared/DonationsCard/CashCard";

const CategoryDetail = () => {
  const { category } = useParams();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchCampaigns = async () => {
        try {
          setLoading(true);
          const campaignsRef = collection(db, "ActiveCampaigns");
          const q = query(
            campaignsRef,
            where("category", "==", category.toLocaleLowerCase())
          );
          const querySnapshot = await getDocs(q);

          const campaignList = querySnapshot.docs.map(doc => doc.data());
          setCampaigns(campaignList);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };

      fetchCampaigns();
    },
    [category]
  );

  if (loading) {
    return (
      <div className="flex flex-row w-[500px] h-[300px] mx-auto items-center justify-center bg-green-20">
        <div className="flex gap-5">
          <div className="w-4 h-4 rounded-full bg-tempColor animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-tempColor animate-bounce [animation-delay:-.3s]" />
          <div className="w-4 h-4 rounded-full bg-tempColor animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold mb-4">
          Discover {category} campaigns on Benevo
        </h1>
        <p className="text-gray-500 mb-8">
          People everywhere are coming together to support the causes they
          believe in.
        </p>
      </div>

      <div className="flex">
        {campaigns.length > 0
          ? <section className="mt-5 bg-pink-20 grid grid-cols-3  gap-8 place-items-center max-w-containerMax mx-auto">
              {campaigns.map((items, index) =>
                <CashCard key={items.id} items={items} index={index} />
              )}
            </section>
          : <div className="w-[600px] mx-auto h-32 border-4 border-dashed grid place-content-center">
              <p className="text-gray-500 text-xl">
                There are currently no active campaigns
              </p>
            </div>}
      </div>
    </div>
  );
};

export default CategoryDetail;
