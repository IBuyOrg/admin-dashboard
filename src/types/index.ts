export interface User {
  id: number;
  name: string;
  email: string;
  number: string;
  job: string;
  facebookAccount: string;
  status: "active" | "blocked";
  type: "admin" | "user";
}

export interface Job {
  id: number;
  label: string;
}

export interface PostType {
  id: number;
  label: string;
}

export interface Location {
  id: number;
  label: string;
}

export interface Building {
  id: number;
  title: string;
  location: Location;
  description: string;
  images: string[];
  type: PostType;
  price: number;
  space: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  numberOfKitchens: number;
  finishing: string;
  furnished: boolean;
  garden: boolean;
  pool: boolean;
  status: "active" | "blocked" | "pending";
  userNumber: string;
  userName: string;
}

export interface ContactRequest {
  id: number;
  postId: number;
  userName: string;
  userNumber: string;
  status: "pending" | "active" | "done";
}
