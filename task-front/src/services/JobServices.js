import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function createJob(details) {
  return axios.post("http://localhost:3000/tasks/jobs", details);
}

export async function getJob(id) {
  return axios.get(`http://localhost:3000/tasks/jobs/${id}`);
}
export async function getJobByUserId(user_id) {
  return axios.get(`http://localhost:3000/tasks/jobs?user_id=${user_id}`);
}

export async function patchJob(id, details) {
  return axios.patch(`http://localhost:3000/tasks/jobs/${id}`, details);
}
export async function getPendingJobs(details) {
  return axios.get("http://localhost:3000/tasks/jobs/pending", details);
}
export async function deleteJob(id) {
  return axios.delete(`http://localhost:3000/tasks/jobs/${id}`);
}
export async function updateJob(id, details) {
  return axios.put(`http://localhost:3000/tasks/jobs/${id}`, details);
}
