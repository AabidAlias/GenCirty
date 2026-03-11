/**
 * services/api.js
 * Centralized Axios instance and API call functions.
 */
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 30000,
});

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("cert_user");
  if (user) {
    const { token } = JSON.parse(user);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Auth ───────────────────────────────────────────────────────────────────────
export async function registerUser({
  name,
  email,
  password,
  orgName,
  senderEmail,
  senderAppPassword,
  agreeTerms,
  agreeData,
  agreePassword,
}) {
  if (!name || !email || !password || !orgName || !senderEmail || !senderAppPassword) {
    throw new Error("Please fill all required fields (including sender Gmail and app password).");
  }
  if (!(agreeTerms && agreeData && agreePassword)) {
    throw new Error("Please check all consent boxes to proceed.");
  }
  const { data } = await api.post("/auth/register", {
    name: String(name).trim(),
    email: String(email).trim(),
    password: String(password),
    org_name: String(orgName).trim(),
    sender_email: String(senderEmail).trim(),
    sender_app_password: String(senderAppPassword).trim(),
    agree_terms: !!agreeTerms,
    agree_data: !!agreeData,
    agree_password: !!agreePassword,
  });
  return data;
}

export async function loginUser({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

// ── Certificate ────────────────────────────────────────────────────────────────
export async function uploadTemplate(file) {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/certificates/upload-template", formData);
  return data;
}

export async function startBatch({ csvFile, emailSubject, emailBody, nameXCm, nameYCm, textBoxWidthCm, orgName }) {
  const formData = new FormData();
  formData.append("csv_file", csvFile);
  formData.append("email_subject", emailSubject);
  formData.append("email_body", emailBody);
  formData.append("name_x_cm", nameXCm);
  formData.append("name_y_cm", nameYCm);
  formData.append("text_box_width_cm", textBoxWidthCm);
  formData.append("org_name", orgName);
  const { data } = await api.post("/certificates/send-batch", formData);
  return data;
}

export async function getBatchProgress(batchId) {
  const { data } = await api.get(`/certificates/progress/${batchId}`);
  return data;
}

export async function getBatchStatus(batchId, skip = 0, limit = 10000) {
  const { data } = await api.get(`/certificates/status/${batchId}`, { params: { skip, limit } });
  return data;
}

export async function retryFailed(batchId, emailSubject, emailBody) {
  const formData = new FormData();
  formData.append("email_subject", emailSubject);
  formData.append("email_body", emailBody);
  const { data } = await api.post(`/certificates/retry/${batchId}`, formData);
  return data;
}

export function getZipDownloadUrl(batchId) {
  return `${BASE_URL}/api/certificates/download-zip/${batchId}`;
}

// ── Verify certificate (public, no auth needed) ────────────────────────────────
export async function verifyCertificate(certCode) {
  const { data } = await api.get(`/certificates/verify/${certCode}`);
  return data;
}

export default api;
