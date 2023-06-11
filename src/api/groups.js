import instance from "./axios";

export const getGroupsReq = async () => await instance.get("/groups");

export const createGroupReq = async (name) =>
  await instance.post("/groups", { name });

export const editGroupReq = async (id, name) =>
  await instance.put(`/groups/${id}`, { name });

export const deleteGroupReq = async (id) =>
  await instance.delete(`/groups/${id}`);

export const getGroupCoursesReq = async (id) =>
  await instance.get(`/groups/${id}`);
