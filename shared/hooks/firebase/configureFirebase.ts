import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const configureFirebase = async () => {
  try {
    // Import the functions you need from the SDKs you need

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // const firebaseConfig = {
    //   apiKey: "AIzaSyBsIXJ96PnsNbNezjUeEzQaQldypcDE5yQ",
    //   authDomain: "nest-pms.firebaseapp.com",
    //   projectId: "nest-pms",
    //   storageBucket: "nest-pms.appspot.com",
    //   messagingSenderId: "762523051004",
    //   appId: "1:762523051004:web:c0e25e56df9c467fa54879",
    // };
    const firebaseConfig = {
      apiKey: "AIzaSyBsIXJ96PnsNbNezjUeEzQaQldypcDE5yQ",
      authDomain: "nest-pms.firebaseapp.com",
      projectId: "nest-pms",
      storageBucket: "nest-pms.appspot.com",
      messagingSenderId: "762523051004",
      appId: "1:762523051004:web:c0e25e56df9c467fa54879",
      measurementId: "G-EPQ2HTX5RB",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    if (await isSupported()) {
      const messaging = getMessaging(app);
    }
  } catch (error) {
    console.warn(error);
  }
};

export default configureFirebase;
