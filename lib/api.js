export  async function fetchJson(url, options) {
    console.log(options)
  const response = await fetch(url, options);
  const data = await response.json();
console.log(data)
  if (!response.ok) {
    throw new Error("error");
  }


  return data;
}
