import { fetchJson } from "./api";

export default async function completeProfile(image,token) {
  const { tags, city, country, firstname, lastname, period_available, prefered_currency } =
    (localStorage && JSON.parse(localStorage.getItem("personaldetails"))) || "";


    console.log(tags,city)
  let formData = new FormData();
  formData.append("image", image);
  formData.append("tags", tags);
  formData.append("city", city);
  formData.append("country", country);
  formData.append("firstname", firstname);
  formData.append("lastname", lastname);
  formData.append("period_available", period_available);
  formData.append("prefered_currency", prefered_currency);

  const res = await fetchJson("http://localhost:3005/api/v1/users/complete-profile", {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}` },
    body: formData,
  });

  console.log(res)

  localStorage ? localStorage.setItem('user', JSON.stringify(res.user)) : null

  return res.status
}
