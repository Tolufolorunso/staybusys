import { getTasks } from "../../../lib/tasks";

export default async function handler(req, res) {
    // console.log(req.headers)
  const tasks = await getTasks();
  res.status(200).json(tasks);
}
