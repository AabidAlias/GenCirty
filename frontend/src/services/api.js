/**
 * services/api.js
 * Using Vercel proxy - BASE_URL is empty so all /api calls go through Vercel
 * which proxies them to Railway backend (bypasses CORS/DNS issues)
 */
import axios from "axios";

const api = axios.create({
  baseURL: `/api`,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("cert_user");
  if (user) {
    try {
      const { token } = JSON.parse(user);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {}
  }
  return config;
});

export async function registerUser({ name, email, password, orgName, senderEmail, senderAppPassword, agreeTerms, agreeData, agreePassword }) {
  if (!name || !email || !password || !orgName || !senderEmail || !senderAppPassword) {
    throw new Error("Please fill all required fields.");
  }
  if (!(agreeTerms && agreeData && agreePassword)) {
    throw new Error("Please check all consent boxes to proceed.");
  }
  const { data } = await api.post("/auth/register", {
    name: String(name).trim(), email: String(email).trim(), password: String(password),
    org_name: String(orgName).trim(), sender_email: String(senderEmail).trim(),
    sender_app_password: String(senderAppPassword).trim(),
    agree_terms: !!agreeTerms, agree_data: !!agreeData, agree_password: !!agreePassword,
  });
  return data;
}

export async function loginUser({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

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
  return `/api/certificates/download-zip/${batchId}`;
}

export async function verifyCertificate(certCode) {
  const { data } = await api.get(`/certificates/verify/${certCode}`);
  return data;
}

export default api;
