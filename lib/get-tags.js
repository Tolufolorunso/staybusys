import { fetchJson } from "./api";
import { API_URI } from "./contant";

export async function getTags() {
  const url = `${API_URI}/tags`;

  try {
    const res = await fetchJson(url);
    // const tags = await res.json();
    return res.tags;
  } catch (error) {
    throw new Error(res.message);
  }
}
