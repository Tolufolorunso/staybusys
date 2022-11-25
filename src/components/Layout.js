import Navbar from "./navbar";
import Footer from "./footer";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { status } = useSession();


  if (status === "loading") {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
