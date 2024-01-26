import { ApiResponse } from "@/shared/contracts/api";

export interface LoginByEmailPayload {
  email: string;
  password: string;
  deviceToken?: string;
}

export interface LoginByFirebasePayload {
  firebaseToken: string;
  fcmToken?: string;
}

export type UserLoginPayload = LoginByEmailPayload;

export interface LoginResponse extends ApiResponse {
  id: string;
  token: string;
}

export interface LogoutResponse extends ApiResponse { }
