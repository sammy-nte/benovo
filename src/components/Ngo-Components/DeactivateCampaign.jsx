import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/redux-features/deactivateSlice";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  updateDoc
} from "firebase/firestore";

function DeactivateCampaign() {
  const { Dedetails } = useSelector(store => store.deactivate);
  const dispatch = useDispatch();

  const deleteCampaign = async (ngoId, campaignId) => {
    try {
      const ngoRef = doc(db, "NGOs", ngoId);
      // Fetch the NGO document to get activeCampaigns
      const ngoDoc = await getDoc(ngoRef);
      if (!ngoDoc.exists()) {
        console.error("NGO document not found");
        return;
      }

      const ngoData = ngoDoc.data();
      const activeCampaigns = ngoData.activeCampaigns || [];

      // Find the index of the campaign to be deleted
      const campaignIndex = activeCampaigns.findIndex(
        campaign => campaign.id === campaignId
      );
      if (campaignIndex === -1) {
        console.error("Campaign not found in active campaigns");
        return;
      }

      // Remove the campaign from activeCampaigns
      activeCampaigns.splice(campaignIndex, 1);

      // Update the NGO document to remove the campaign
      await updateDoc(ngoRef, {
        activeCampaigns
      });

      // Query to find the document in the ActiveCampaigns collection
      const activeCampaignsCollectionRef = collection(db, "ActiveCampaigns");
      const q = query(
        activeCampaignsCollectionRef,
        where("id", "==", campaignId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error(
          "Campaign document not found in ActiveCampaigns collection"
        );
        return;
      }

      // Assuming there's only one matching document
      const activeCampaignDoc = querySnapshot.docs[0];

      // Delete the document from ActiveCampaigns
      await deleteDoc(activeCampaignDoc.ref);

      toast.success("Campaign deleted successfully.");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("An error occurred while deleting the campaign.");
    }
  };

  const handleComplete = async (ngoId, campaignId) => {
    try {
      const ngoRef = doc(db, "NGOs", ngoId);

      // Fetch the NGO document to get activeCampaigns
      const ngoDoc = await getDoc(ngoRef);
      if (!ngoDoc.exists()) {
        console.error("NGO document not found");
        return;
      }

      const ngoData = ngoDoc.data();
      const activeCampaigns = ngoData.activeCampaigns || [];
      const completedCampaigns = ngoData.completedCampaigns || [];

      // Find the campaign to be moved to completed
      const campaignIndex = activeCampaigns.findIndex(
        campaign => campaign.id === campaignId
      );
      if (campaignIndex === -1) {
        toast.error("Campaign not found in active campaigns");
        return;
      }
      // console.log(activeCampaigns[campaignIndex]);

      // Remove the campaign from activeCampaigns and add to completedCampaigns
      const [completedCampaign] = activeCampaigns.splice(campaignIndex, 1);
      completedCampaigns.push(completedCampaign);

      // Update the NGO document
      await updateDoc(ngoRef, {
        activeCampaigns,
        completedCampaigns
      });

      // Query to find the document in the ActiveCampaigns collection
      const activeCampaignsCollectionRef = collection(db, "ActiveCampaigns");
      const q = query(
        activeCampaignsCollectionRef,
        where("id", "==", campaignId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error(
          "Campaign document not found in ActiveCampaigns collection"
        );
        return;
      }

      // Assuming there's only one matching document
      const activeCampaignDoc = querySnapshot.docs[0];

      // Delete the document from ActiveCampaigns
      await deleteDoc(activeCampaignDoc.ref);

      // Add the campaign to the CompletedCampaigns collection
      const completedCampaignDocRef = doc(db, "CompletedCampaigns", campaignId);
      await setDoc(completedCampaignDocRef, completedCampaign);

      toast.success("Campaign completed successfully.");
      dispatch(closeModal());
    } catch (error) {
      toast.error("An error occurred while completing the campaign.");
    }
  };
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-950 bg-opacity-40 z-10 backdrop-blur-sm ">
      <div className="bg-white w-[500px] h-[210px] overflow-y-auto  shadow-lg rounded-lg p-3">
        <div className="text-center">
          <h3 className="px-5 font-medium">
            <span className="before:block before:absolute before:-inset-1 before:bg-red-600 before:rounded-md relative inline-block">
              <span className="relative text-white">Important</span>
            </span>
          </h3>
        </div>
        <h3 className="text-center py-2 font-bold">
          You are about to de-activate this campaign
        </h3>
        <p className="text-center">
          <span className="font-bold">Campaign: </span>
          {Dedetails.campaignTitle}
        </p>
        <p className="text-center pt-5">Select one of the options below:</p>
        <div className="flex justify-between items-center w-[80%] mx-auto">
          <button
            onClick={() => {
              deleteCampaign(Dedetails.ngo, Dedetails.id);
            }}
            className="my-2 w-[100px] h-8 border-red-600 border-2 mr-2 rounded-md text-textColor  font-medium text-sm hover:bg-red-600 hover:text-white transition-all"
          >
            Delete
          </button>
          <button
            onClick={() => {
              handleComplete(Dedetails.ngo, Dedetails.id);
            }}
            className="my-2 w-[100px] h-8 border-green-600 border-2 mr-2 rounded-md text-textColor  font-medium text-sm hover:bg-green-600 hover:text-white transition-all"
          >
            Complete
          </button>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
            className="my-2 w-[100px] h-8 border-tempColor border-2 mr-2 rounded-md text-textColor  font-medium text-sm hover:bg-tempColor hover:text-white transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeactivateCampaign;
