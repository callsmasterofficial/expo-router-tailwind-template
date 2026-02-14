const admin = require('firebase-admin');
const { Expo } = require('expo-server-sdk');
const axios = require('axios');
const path = require('path');

// Initialize Firebase Admin
// Make sure to provide the correct path to your service account key file
const serviceAccount = require(path.join(__dirname, '../urmil-jewellers-notifications-firebase-adminsdk-fbsvc-7a471e6cfa.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const expo = new Expo();

async function sendDailyGoldRate() {
  try {
    console.log("Fetching live gold rates...");
    // 1. Fetch Gold Rate
    const rateResponse = await axios.get("https://gold.accessdashboard.live/api/gold-rates");
    const rates = rateResponse.data;

    // Assuming the structure is similar to what's used in the app, usually an array where index 0 is Gold, 1 is Silver
    const goldData = rates[0];
    const silverData = rates[1];

    if (!goldData) {
      console.error("Could not fetch gold data");
      return;
    }

    const goldRate = goldData.Bid || goldData.bid;
    const silverRate = silverData?.Bid || silverData?.bid;
    const date = new Date().toLocaleDateString('en-IN');

    const messageBody = `Today's Gold Rate: ₹${goldRate} | Silver: ₹${silverRate}`;
    console.log("Distribution Message:", messageBody);

    // 2. Fetch Tokens from Firestore
    console.log("Fetching user tokens...");
    const usersSnapshot = await db.collection('users').get();
    let tokens = [];
    usersSnapshot.forEach(doc => {
      if (doc.data().expoPushToken) {
        tokens.push(doc.data().expoPushToken);
      }
    });

    // Valid unique tokens
    tokens = [...new Set(tokens)];
    console.log(`Found ${tokens.length} tokens.`);

    // 3. Create Messages
    let messages = [];
    for (let pushToken of tokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      messages.push({
        to: pushToken,
        sound: 'default',
        title: 'Daily Gold Rate Update 🌟',
        body: messageBody,
        data: { goldRate, silverRate, date },
      });
    }

    // 4. Send Notifications in Chunks
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    console.log("Sending notifications...");
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log("Sent chunk:", ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending chunk", error);
      }
    }

    // 5. Success
    console.log("Daily notifications sent successfully!");

  } catch (error) {
    console.error("Error in sendDailyGoldRate:", error);
  } finally {
    process.exit();
  }
}

sendDailyGoldRate();
