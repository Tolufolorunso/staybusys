export async function fetchJson(url, options) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Something went wrong, Check you network or try to reload");
  }
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
    body: data,
  });
  return res;
}

export async function getUserTasks(token, url) {
  try {
    const res = await fetchJson(url, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}
