import { fetchJson } from "lib/api";
import { API_URI } from "lib/contant";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

function VerifyUserPage() {
  const { query } = useRouter();
  const [message, setMessage] = useState("");

  console.log(query.token);

  async function verifyUser() {
    const url = `${API_URI}/auth/verify-user/${query.token}/${query.email}`;
    const isVerified = await fetchJson(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        verificationToken: query.token,
        email: query.email,
      }),
    });

    if (isVerified.status) {
      setMessage(isVerified.message);
    }
  }

  useEffect(() => {
    verifyUser();
    console.log("verify")
  });
  return (
    <>
      <h1>Verify user</h1>
      {message !== "" && <p>{message}</p>}
      <p><Link href="/login">Login to your Account</Link></p>
    </>
  );
}

export default VerifyUserPage;
