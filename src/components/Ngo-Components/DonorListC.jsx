import { useDispatch } from "react-redux";
import { openDetails } from "../../redux/redux-features/donorDetailSlice";

export default function DonorList({ data }) {
  const { name, imageUrl, amount, materialItem, donationType } = data;
  const dispatch = useDispatch();

  return (
    <div className="divide-y bg-pin-200 divide-gray-100 w-full mx-auto p-3 border-b-2">
      <div className="flex bg-yelow-100 flex-col md:flex-row justify-between gap-x-6 py-2 items-center">
        <div className="flex flex-col md:flex-row bg-bue-400 min-w-0 gap-x-4 items-center">
          <div className="h-12 w-12 flex-none rounded-full bg-violetLight grid place-content-center">
            <p className="text-white font-bold text-xl">
              {" "}{name[0]}
            </p>
          </div>
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {name}
            </p>
          </div>
        </div>
        <div className="bg-gren-300 shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-textColor font-normal capitalize">
            {amount && "Ghc"} {amount || materialItem}
          </p>
        </div>
        {donationType === "material" &&
          <button
            onClick={() => {
              dispatch(openDetails(data));
            }}
            className="border-violetLight border-2 font-bold rounded-md w-16 hover:bg-tempColor hover:text-white transition-all"
          >
            Details
          </button>}
      </div>
    </div>
  );
}
