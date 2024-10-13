import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "../../environments/environment";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const db = getDatabase();

export default db; 
