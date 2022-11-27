import { fetchJson } from "lib/api";

export default async function handler(req, res) {
  const tasks = await fetchJson(`http://localhost:3005/api/v1/tasks`, {
    method: "GET",
    headers: { authorization: `Bearer ${req.body.token}` },
  });
  res.status(200).json({
    status: true,
    tasks: tasks.tasks,
  });
}
