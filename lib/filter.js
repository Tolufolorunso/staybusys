import { fetchJson } from "./api";

export function padPrice(price) {
    price = price + "00"
    return  +price
}

export async function filterTask(url,setTasksList,props,toast) {
    try {
        const res = await fetchJson(url, {
          method: "GET",
          headers: { authorization: `Bearer ${props.accessToken}` },
        });
  
        if (res.status) {
          setTasksList(res.tasks);
        }
  
        if (!res.status) {
          throw new Error(res.message);
        }
      } catch (error) {
        toast.error(error.message);// show error message
      }
}