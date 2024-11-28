import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshTokenHeader } from "./userService";

refreshTokenHeader();

export async function createJob(details) {
  return axios.post("http://localhost:5000/tasks/jobs", details);
}

export async function getJob(id) {
  return axios.get(`http://localhost:5000/tasks/jobs/${id}`);
}
export async function getJobByUserId(user_id) {
  return axios.get(`http://localhost:5000/tasks/jobs?user_id=${user_id}`);
}

export async function patchJob(id, details) {
  return axios.patch(`http://localhost:5000/tasks/jobs/${id}`, details);
}
export async function getPendingJobs(details) {
  return axios.get("http://localhost:5000/tasks/jobs/pending", details);
}
export async function getAllJobs(details) {
  return axios.get("http://localhost:5000/tasks/jobs/alljobs", details);
}
export async function getCompletedJobs(details) {
  return axios.get("http://localhost:5000/tasks/jobs/completed", details);
}
export async function getOpenJobs(details) {
  return axios.get("http://localhost:5000/tasks/jobs/open", details);
}
export async function deleteJob(id) {
  return axios.delete(`http://localhost:5000/tasks/jobs/${id}`);
}
export async function updateJob(id, details) {
  return axios.put(`http://localhost:5000/tasks/jobs/${id}`, details);
}
