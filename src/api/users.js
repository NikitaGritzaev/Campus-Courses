import instance from "./axios";

export const getUsersReq = async () => await instance.get("/users");

export const getRolesReq = async () => await instance.get("/roles");
