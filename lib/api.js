export async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

export async function fetchTasks(token, url) {
  const res = await fetchJson(url, {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });
  return res;
}

export async function getSubmission(token, url) {
  const res = await fetchJson(url, {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });
  return res;
}

export async function saveSubmission(token, url, data) {
  const res = await fetchJson(url, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: data
  });
  return res;
}
