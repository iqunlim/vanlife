import { db } from "../api";

import {
  collection,
  getAggregateFromServer,
  getDocs,
  query,
  sum,
  Timestamp,
  where,
} from "firebase/firestore";
import { APIError, IncomeEntry } from "../types";

const incomeCollectionRef = collection(db, "transactions");
const thirtyDaysAgo = Timestamp.fromDate(
  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
);
export async function getHostIncome(hostId: string) {
  console.debug("Fetching income");
  const q = query(
    incomeCollectionRef,
    where("host", "==", hostId),
    where("date", ">=", thirtyDaysAgo)
  );
  const snapshot = await getDocs(q);
  const income = snapshot.docs.map((doc) => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    if (isIncomeEntry(data)) {
      return data;
    } else {
      throw new APIError(
        `Invalid API return in getHostIncome(), id ${hostId}`,
        "Internal Server Error",
        500
      );
    }
  });
  return income;
}

export async function getHostTotal(hostId: string) {
  const q = query(
    incomeCollectionRef,
    where("host", "==", hostId),
    where("date", ">=", thirtyDaysAgo)
  );
  const snapshot = await getAggregateFromServer(q, {
    total: sum("amount"),
  });
  return snapshot.data().total;
}

function isIncomeEntry(obj: unknown): obj is IncomeEntry {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as IncomeEntry).id === "string" &&
    typeof (obj as IncomeEntry).host === "string" &&
    typeof (obj as IncomeEntry).amount === "number" &&
    (obj as IncomeEntry).date instanceof Timestamp
  );
}
