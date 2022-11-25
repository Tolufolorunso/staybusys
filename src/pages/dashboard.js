import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { LatestOrders } from "../components/dashboard/dasboard-table";
import { LatestProducts } from "../components/dashboard/latest-products";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";

import { DashboardLayout } from "../components/dashboard-layout";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...session,
    },
  };
}

const Dashboard = (props) => {
  const {user} =props

  const router = useRouter();
  if(!user.completed) {
    router.push('/personaldetails')
  }
  return (
    <>
      <Head>
        <title>Dashboard | Stay busy</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography color="textPrimary" gutterBottom variant="h3">
            Hello, Tony
          </Typography>
          <Grid container spacing={3}>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalCustomers
                style={{
                  border: "1px solid rgba(255, 204, 0, 0.2)",
                  boxShadow: " 0px 7px 20px rgba(145, 156, 212, 0.15)",
                }}
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TasksProgress
                style={{
                  border: "1px solid rgba(255, 204, 0, 0.2)",
                  boxShadow: " 0px 7px 20px rgba(145, 156, 212, 0.15)",
                }}
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalProfit
                style={{
                  border: "1px solid rgba(255, 204, 0, 0.2)",
                  boxShadow: " 0px 7px 20px rgba(145, 156, 212, 0.15)",
                }}
              />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <LatestProducts
                style={{
                  border: "1px solid #2F2E40",
                  boxShadow: " 0px 7px 20px rgba(145, 156, 212, 0.15)",
                }}
              />
            </Grid>

            <Grid item lg={12} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
