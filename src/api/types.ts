import { Timestamp } from "firebase/firestore";

/**
 * Van types, usually used to color buttons
 */
export type VanType = "simple" | "rugged" | "luxury";

/**
 * Structure of the Van Object used all throughout the VanLife application
 * See {@link VanType} for type details
 */
export interface VanObject {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: VanType;
}

export class APIError extends Error {
  statusText: string;
  status: number;

  /**
   * API Error as returned from API Functions in the VanLife application
   * @param message The error message
   * @param statusText A user-friendly error text
   * @param status The HTTP Code of the response, or a manually set HTTP Code
   */
  constructor(message: string, statusText: string, status: number) {
    super(message);
    this.statusText = statusText; // Text to display to the user
    this.status = status; // HTTP Code, manually set right now
  }
}

/** Shorthand for a react setstate function */
export type StateCallback<T> = React.Dispatch<React.SetStateAction<T>>;

// User log in credentials type
export type Credentials = {
  email: string;
  password: string;
};

/** Type for Host Income Page */
export type IncomeEntry = {
  id: string;
  host: string;
  date: Timestamp;
  amount: number;
};

/** Type for Host Review Page */
export type ReviewEntry = {
  id: string;
  host: string;
  rating: number;
  name: string;
  date: Timestamp;
  content?: string;
};

/**
 * Converts a number to $<number>.00
 */
export const USDollarConverter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
