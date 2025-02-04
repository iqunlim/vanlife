import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { StateCallback } from "../types";
import { app } from "../api";

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
