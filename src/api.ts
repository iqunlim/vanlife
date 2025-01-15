import { VanDataAll } from "./pages/Vans/Vans";

export class APIError extends Error {
  statusText: string;
  status: number;

  constructor(message: string, statusText: string, status: number) {
    super(message);
    this.statusText = statusText;
    this.status = status;
  }
}

export async function getVansFromAPI(): Promise<VanDataAll> | never {
  const res = await fetch("/api/vans");
  if (!res.ok || res.status != 200) {
    throw new APIError("Failed to fetch vans", res.statusText, res.status);
  }
  const data = await res.json();
  return data;
}

export type Creds = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  name: string;
};

type TokenResponse = {
  user: User;
  token: string;
};

export async function loginUser(creds: Creds): Promise<TokenResponse> | never {
  console.log(creds);
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
