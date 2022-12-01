export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

export async function fetchTasks(token,url) {
  const res = await fetchJson(url, {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });
  return res
}
// fetchTasks();
