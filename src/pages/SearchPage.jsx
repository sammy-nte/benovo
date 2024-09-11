import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import CashCard from "../components/shared/DonationsCard/CashCard";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query").toLowerCase();

  useEffect(
    () => {
      const fetchResults = async () => {
        const campaignsRef = collection(db, "ActiveCampaigns");
        const q = query(campaignsRef);
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs
          .filter(doc => {
            const data = doc.data();
            const campaignTitleMatch = data.campaignTitle
              .toLowerCase()
              .includes(searchQuery);
            const organizationMatch = data.organization
              .toLowerCase()
              .includes(searchQuery);
            return campaignTitleMatch || organizationMatch;
          })
          .map(doc => ({ id: doc.id, ...doc.data() }));

        setSearchResults(results);
        setLoading(false);
        setNoResults(results.length === 0);
      };

      fetchResults();
    },
    [searchQuery]
  );

  console.log(noResults);

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
          Search results for "{searchQuery}"
        </h1>
        <p className="text-gray-500 mb-8">
          People everywhere are coming together to support the causes they
          believe in.
        </p>
      </div>
      {noResults
        ? <div className="w-[600px] mx-auto h-32 border-4 border-dashed grid place-content-center">
            <p className="text-gray-500 text-xl">
              No results found for "{searchQuery}"
            </p>
          </div>
        : <section className="mt-5 bg-pink-20 grid grid-cols-3  gap-8 place-items-center max-w-containerMax mx-auto">
            {searchResults.map((items, index) =>
              <CashCard key={items.id} items={items} index={index} />
            )}
          </section>}
    </div>
  );
};

export default SearchPage;
