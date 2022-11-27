import { fetchJson } from "./api";
import { API_URI } from "./contant";

export async function getTags() {
  const url = `${API_URI}/tags`;
console.log(url)
  try {
    const res = await fetchJson(url);
    console.log(res)
    return res.tags;
  } catch (error) {
    throw new Error(error.message);
  }
}
