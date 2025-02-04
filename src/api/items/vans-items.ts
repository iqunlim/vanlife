import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../api";
import { APIError, VanObject, VanType } from "../types";

const vansCollectionRef = collection(db, "vans");

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
 * A function to validate that an API Return or other object is a VanObject
 */
function isVanObject(obj: unknown): obj is VanObject {
  const validVanTypes: VanType[] = ["simple", "rugged", "luxury"];

  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as VanObject).id === "string" &&
    typeof (obj as VanObject).name === "string" &&
    typeof (obj as VanObject).price === "number" &&
    typeof (obj as VanObject).description === "string" &&
    typeof (obj as VanObject).imageUrl === "string" &&
    validVanTypes.includes((obj as VanObject).type)
  );
}
