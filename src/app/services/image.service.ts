import { initializeApp } from "firebase/app";
import { environment } from "../../environments/environment";
import { getStorage } from "firebase/storage";

const app = initializeApp(environment.firebaseConfig);

const storage = getStorage(app);

export default storage;