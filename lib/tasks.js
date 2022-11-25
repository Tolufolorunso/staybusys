

export async function getTasks() {
    const response = await fetch("http://localhost:3005/api/v1/auth/register");
    const tasks = await response.json();
    return tasks
  }