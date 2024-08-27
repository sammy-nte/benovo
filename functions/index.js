/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.resetTodaysDonations = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async context => {
    const db = admin.firestore();

    try {
      // Fetch all NGO documents in the 'NGOs' collection
      const ngosSnapshot = await db.collection("NGOs").get();

      const batch = db.batch();

      ngosSnapshot.forEach(ngoDoc => {
        const ngoData = ngoDoc.data();

        // Reset NGO-level todaysDonation to 0
        batch.update(ngoDoc.ref, {
          todaysDonation: 0
        });

        // Check if there's an activeCampaigns array
        if (ngoData.activeCampaigns && Array.isArray(ngoData.activeCampaigns)) {
          ngoData.activeCampaigns.forEach((_, index) => {
            // Reset campaign-level todaysDonation to 0
            batch.update(ngoDoc.ref, {
              [`activeCampaigns.${index}.todaysDonation`]: 0
            });
          });
        }
      });

      await batch.commit();
      console.log("TodaysDonations reset for all NGOs and their campaigns.");
    } catch (error) {
      console.error("Error resetting TodaysDonations:", error);
    }

    return null;
  });
