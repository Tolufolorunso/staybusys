import { fetchJson } from "lib/api";
import { API_URI } from "lib/contant";

export default async function handler(req, res) {
  const tasks = await fetchJson(`${API_URI}/tasks`, {
    method: "GET",
    headers: { authorization: `Bearer ${req.body.token}` },
  });
  res.status(200).json({
    status: true,
    tasks: tasks.tasks,
  });
}
