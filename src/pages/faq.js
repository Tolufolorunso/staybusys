import Head from 'next/head'
import React from 'react'
import  Section1 from '../components/Faq/section1'
import  Section5  from '../components/Home/section5'
import Layout  from '../components/Layout'

export default function Faq() {
  return (
    <Layout>
    <div className='container'>
      <Head>
        <title>Stay Busy</title>
        <meta name="description" content=" create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

   <Section1 />
   <Section5 />
    </div>
    </Layout>
  )
}
