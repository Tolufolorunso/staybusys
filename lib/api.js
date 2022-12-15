import { signOut } from "next-auth/react";
import { Router } from "next/router";

export async function fetchJson(url, options) {
  try {
    const res = await fetch(url, options);
    if (res.status === 401) {
      signOut();
      Router().push("/login");
      throw new Error({ status: 401 });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    if (error.message == 401) {
      throw new Error("You are not loggedIn");
    }
    throw new Error("Something went wrong, Check you network or try to reload");
  }
}

export async function fetchTasks(token, url) {
  try {
    const res = await fetchJson(url, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSubmission(token, url) {
  try {
    const res = await fetchJson(url, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function saveSubmission(token, url, data) {
  try {
    const res = await fetchJson(url, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
      body: data,
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteSubmission(token, url) {
  try {
    const res = await fetchJson(url, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserTasks(token, url) {
  try {
    const res = await fetchJson(url, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSetting(token, url) {
  try {
    const res = await fetchJson(url, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}
