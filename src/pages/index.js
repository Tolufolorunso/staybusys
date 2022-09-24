import Head from "next/head";

import Layout from "../components/Layout";
import Section1 from "../components/Home/section1";
import Section2 from "../components/Home/section2";
import Section21 from "../components/Home/section21";
import Section3 from "../components/Home/section3";
import Section4 from "../components/Home/section4";
import Section5 from "../components/Home/section5";
import Section6 from "../components/Home/section6";
import Section7 from "src/components/Home/section7";
import Section8 from "src/components/Home/section8";
import { Divider } from "@mui/material";

const Home = () => {
  return (
    <Layout>
      <div className="container">
        <Head>
          <title>Stay Busy</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Section1 />
        <div className="sectionColor"><Section2 />
       
        <Section3 />
        <Section21 />
        <Section6 />
        <Section4 />
        </div>

        <Section7 />
        <Divider style={{color:"#E4E4E7"}} />
          
          
        <Section8 />
        <Section5 />
        
      </div>
    </Layout>
  );
};

export default Home;
