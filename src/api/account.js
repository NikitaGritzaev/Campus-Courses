import instance from "./axios";

export const registrationReq = async (
  fullName,
  birthDate,
  email,
  password,
  confirmPassword
) =>
  await instance.post("/registration", {
    fullName,
    birthDate,
    email,
    password,
    confirmPassword,
  });

export const loginReq = async (email, password) =>
  await instance.post("/login", {
    email,
    password,
  });

export const logoutReq = async () => await instance.post("/logout");

export const getProfileReq = async () => await instance.get("/profile");

export const editProfileReq = async (fullName, birthDate) =>
  await instance.put("/profile", { fullName, birthDate });
