// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2XZpqqGSTp_6roVm0GcBQ9RrnKrgps3Y",
  authDomain: "music-player-project-7bd7c.firebaseapp.com",
  projectId: "music-player-project-7bd7c",
  storageBucket: "music-player-project-7bd7c.appspot.com",
  messagingSenderId: "807013131171",
  appId: "1:807013131171:web:b4b4b7717a6ffb61b37016",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
