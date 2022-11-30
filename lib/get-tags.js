import { fetchJson } from "./api";
import { API_URI } from "./contant";

export async function getTags() {
  const url = `${API_URI}/tags`;
  try {
    const res = await fetchJson(url);
    return res.tags;
  } catch (error) {
    throw new Error(error.message);
  }
}
