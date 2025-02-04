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
    super(message); // The error message as usual
    this.statusText = statusText; // Text to display to the user
    this.status = status; // HTTP Code, manually set right now
  }
}

// Type Guards
// TODO: Try Zod? Doing this is not the modern way
// to validate API return objects.
/**
 * A function to validate that an API Return or other object is a VanObject
 */
export function isVanObject(obj: unknown): obj is VanObject {
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

// Shorthand for a react setstate function
export type StateCallback<T> = React.Dispatch<React.SetStateAction<T>>;

// User log in credentials type
export type Creds = {
  email: string;
  password: string;
};

export type IncomeEntry = {
  date: Date;
  value: number;
};

export type ReviewEntry = {
  host: string;
  rating: number;
  name: string;
  date: Date;
  content?: string;
};

/**
 * Converts a number to $<number>.00
 */
export const USDollarConverter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
