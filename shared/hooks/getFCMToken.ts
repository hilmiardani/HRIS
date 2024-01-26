import { getMessaging, getToken, isSupported } from "firebase/messaging";
import Cookies from "js-cookie";

const getFCMToken = async () => {
  if (await isSupported()) {
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        "BO9zJi5IwaboNgg6Kk9GLQ5KfQHQFtujwM4jIjbgd4P8AbQpqV69X-OzFCgf7fJJOs23yERRRKeo7CD5ywLQJ0E",
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          // console.log("Current Token ", currentToken);
          Cookies.set("fcmToken", currentToken);
        } else {
          // Show permission request UI
          console.log("No registration token available. Request permission to generate one.");
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }
};

export default getFCMToken;
