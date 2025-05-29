import { axiosInstance } from "./axios";

export async function signUp(signupData) {
    const response= await axiosInstance.post("/auth/signup",signupData)
    return response.data();
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
export async function completeOnboarding(formdata) {
const response = await axiosInstance.post("/auth/onboarding",formdata)
return response.data;
}