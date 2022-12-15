import { fetchJson } from "./api";
import { API_URI } from "./contant";

export default async function completeProfile(image, token) {
  const { tags, city, country, firstname, lastname, period_available, prefered_currency } =
    (typeof window !== "undefined" && JSON.parse(localStorage.getItem("personaldetails"))) || "";
  let formData = new FormData();
  formData.append("image", image);
  formData.append("tags", tags);
  formData.append("city", city);
  formData.append("country", country);
  formData.append("firstname", firstname);
  formData.append("lastname", lastname);
  formData.append("period_available", period_available);
  formData.append("prefered_currency", prefered_currency);

  const res = await fetchJson(`${API_URI}/users/complete-profile`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}` },
    body: formData,
  });

  return res;
}
