import { axiosInstance } from "./axios";

// Authentication

export async function signUp(signupData) {
  const response = await axiosInstance.post("/auth/signup", signupData)
  return response.data;
}

export async function completeOnboarding(formdata) {
  const response = await axiosInstance.post("/auth/onboarding", formdata)
  return response.data;
}

export async function Login(logindata) {
  const response = await axiosInstance.post("/auth/login", logindata)
  return response.data;
}
export async function Logout() {
  const response = await axiosInstance.post("/auth/logout")
  return response.data;
}

export async function getAuthUser() {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
}

//Users 
export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends")
  return response.data
}

export async function getRecommendedUser() {
  const response = await axiosInstance.get("/users")
  return response.data
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-request")
  return response.data
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data
}

export async function getfriendRequest() {
const response =await axiosInstance.get("/users/friend-request") 
return response.data
}

export async function acceptFriendReqs(requestId) {
  const response =await axiosInstance.put(`/users/friend-request/${requestId}/accept`)
  return response.data
}