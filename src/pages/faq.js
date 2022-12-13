import Head from 'next/head'
import React,{useEffect,useState} from 'react'
import  Section1 from '../components/Faq/section1'
import  Section5  from '../components/Home/section5'
import Layout  from '../components/Layout'
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Faq() {
  let [spinner, setSpinner] = useState(false);
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {
    setSpinner(true)
    setTimeout(() => {
      setSpinner(false);
    }, 5000);
  },[]);
  return (
    <Layout>
       <Head>
              <title>FAQs | StayBusy.io</title>
              <meta name="description" content=" create next app" />
              {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
      {spinner ? (
        <div className="container1">
          {" "}
          <PropagateLoader
            color={"#FFCC00"}
            spinner={spinner}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="container">


            <Section1 />
            <Section5 />
          </div>
        </>
      )}
    </Layout>
  );
}
