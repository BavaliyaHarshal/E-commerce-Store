export const API_BASE = "http://localhost:3020";

export async function fetchResource(resource) {
  const res = await fetch(`${API_BASE}/${resource}`);
  return res.json();
}

export async function postResource(resource, data) {
  const res = await fetch(`${API_BASE}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function putResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteResource(resource, id) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function patchResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  return res.json();
}