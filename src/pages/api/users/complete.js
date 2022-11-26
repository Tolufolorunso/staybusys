import { fetchJson } from "lib/api";

export default async function handler(req, res) {
  // console.log(req.body);
  // const user = fetchJson(`http://localhost:3005/api/v1/users/complete-profile`, {
  //   method: "PATCH",
  // });
  res.status(200).json({});
}
