import { FirebaseError, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { APIError } from "./types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4v-J0MDhzc7MfSufei2XPqBZImJ6N62o",
  authDomain: "iq-test-vans-project.firebaseapp.com",
  projectId: "iq-test-vans-project",
  storageBucket: "iq-test-vans-project.firebasestorage.app",
  messagingSenderId: "55324281256",
  appId: "1:55324281256:web:a379f2ce06f47cde15759d",
};

// Firebase app and service initialization
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
