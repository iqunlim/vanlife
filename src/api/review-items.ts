import {
  average,
  collection,
  getAggregateFromServer,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./api";
import { APIError, ReviewEntry } from "./types";

const reviewsCollectionRef = collection(db, "reviews");

export async function GetHostReviews(hostId: string) {
  console.debug("Fetching reviews");
  const q = query(reviewsCollectionRef, where("host", "==", hostId));
  const snapshot = await getDocs(q);
  const reviews = snapshot.docs.map((doc) => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    if (isReviewEntry(data)) {
      return data;
    } else {
      throw new APIError(
        `Invalid API return in getHostVans(), id ${hostId}`,
        "Internal Server Error",
        500
      );
    }
  });
  return reviews;
}

export async function getAverageReviews(hostId: string) {
  console.debug("Fetching review average");

  const q = query(reviewsCollectionRef, where("host", "==", hostId));
  const snapshot = await getAggregateFromServer(q, {
    averageReviewScore: average("rating"),
  });
  return snapshot.data().averageReviewScore;
}

// Put, etc goes here (if required)

function isReviewEntry(obj: unknown): obj is ReviewEntry {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as ReviewEntry).id === "string" &&
    typeof (obj as ReviewEntry).host === "string" &&
    typeof (obj as ReviewEntry).rating === "number" &&
    typeof (obj as ReviewEntry).name === "string" &&
    (obj as ReviewEntry).date instanceof Timestamp &&
    ((obj as ReviewEntry).content === undefined ||
      typeof (obj as ReviewEntry).content === "string")
  );
}
