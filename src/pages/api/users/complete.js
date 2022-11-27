import { fetchJson } from "lib/api";

export default async function handler(req, res) {
  // console.log(req.body);
  // const user = fetchJson(`${API_URI}/users/complete-profile`, {
  //   method: "PATCH",
  // });
  res.status(200).json({});
}
