import { FirebaseError, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { APIError, isVanObject, StateCallback } from "./types";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Firebase app and service initialization
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");
const auth = getAuth(app);

// This line sets the "persistence" of the logged in user
// Specifically, this sets that it will be held open until the window is closed
// For this example app, this seems like the ideal way to do it.
setPersistence(auth, browserSessionPersistence);

/**
 * Authentication state variable set up function
 * This will set up an "onAuthStateChanged" event listener that fires whenever auth changes
 * @param setAuthenticated Authenticated global state setter
 * @param setUserId user ID global state setter, used for host functions
 * @returns an Unsubscribe function for cleanup purposes
 */
export function setupAuthenticator(
  setAuthenticated: StateCallback<boolean>,
  setUserId: StateCallback<string>
) {
  const auth = getAuth(app);
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user set");
      setAuthenticated(true);
      setUserId(user.uid);
    } else {
      console.log("user not set");
    }
  });
}

/**
 * A thin API wrapper to create hosts
 * @param email User email to be created
 * @param password User password
 * @returns A Promise with the user information attached
 */
export async function createNewHost(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * A thin API wrapper to log in the host
 * @param email User email
 * @param password User password
 * @returns An unsubscribe function which will log the user out
 */
export async function loginHost(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * A thin API wrapper to log out the host
 */
export async function logoutHost() {
  return signOut(auth);
}

/**
 * A function to get all vans
 * TODO: Pagination considerations
 * @returns All vans currently in the database
 */
export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  const vans = snapshot.docs.map((doc) => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    if (isVanObject(data)) {
      return data;
    } else {
      throw new APIError(
        `Invalid API return in getVans(), id ${doc.id}`,
        "Internal Server Error",
        500
      );
    }
  });

  return vans;
}

/**
 * Function to get a single van from the API
 * @param id Van ID field
 * @returns a VanObject contained the data
 */
export async function getVan(id: string) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    // Firebase returns do not inherently have the id, but we want it
    const data = { ...snapshot.data(), id: snapshot.id };
    // Basic type guard function check
    if (isVanObject(data)) {
      return data;
    } else {
      throw new APIError(
        `Invalid API Return in GetVan(${id})`,
        "Internal Server Error",
        500
      );
    }
  } else {
    throw new APIError(
      `Van ${id} Not Found`,
      "Bad Request: Van not found",
      400
    );
  }
}

/**
 * A function to get a specific host user's vans
 * @param hostId The HOST user Id to look up with
 * @returns A list of VanObjects associated with the host
 */
export async function getHostVans(hostId: string) {
  console.log("hostID:", hostId);
  const q = query(vansCollectionRef, where("hostId", "==", hostId));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    if (isVanObject(data)) {
      return data;
    } else {
      throw new APIError(
        `Invalid API return in getHostVans(), id ${hostId}`,
        "Internal Server Error",
        500
      );
    }
  });

  return vans;
}

/**
 * A non-exhaustive list of firebase errors and transformations in to more
 * user friendly api errors
 * @param error A firebase Error
 * @returns An APIError object with a user-friend messageText attached
 */
export default function FirebaseErrorToAPIError(error: FirebaseError) {
  let errorText = "";
  switch (error.code) {
    case "auth/invalid-credential":
      errorText = "Email or password is incorrect";
      break;
    case "auth/invalid-email":
      errorText = "Invalid email format.";
      break;
    case "auth/user-disabled":
      errorText = "User account is disabled.";
      break;
    case "auth/user-not-found":
      errorText = "No user found with this email.";
      break;
    case "auth/wrong-password":
      errorText = "Incorrect password.";
      break;
    case "auth/too-many-requests":
      errorText = "Too many failed attempts. Please try again later.";
      break;
    case "auth/network-request-failed":
      errorText = "Network error. Please check your connection.";
      break;
    default:
      errorText = `Unknown error occurred:`;
      console.debug(`Unknown error occured: ${error.code}`);
  }
  return new APIError(error.message, errorText, 400);
}
