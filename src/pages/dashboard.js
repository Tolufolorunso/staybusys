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
import { useEffect } from "react";

const Dashboard = (props) => {
  const { user } = props;

  console.log(user)
  const router = useRouter();
  if (typeof window === "undefined") return null;

  if (!user?.completed && !user.firstname) {
    router.replace("/personaldetails");
  }

  useEffect(() => {
    fetch("/api/auth/session?update");
  })

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
            Hello, {user.firstname}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalCustomers
                style={{
                  border: "1px solid rgba(255, 204, 0, 0.2)",
                  boxShadow: " 0px 7px 20px rgba(145, 156, 212, 0.15)",
                }}
                totalCompleted={user?.completedTasks.length}
              />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TasksProgress
                style={{
                  border: "1px solid rgba(255, 204, 0, 0.2)",
                  boxShadow: " 0px 7px 20px rgba(145, 156, 212, 0.15)",
                }}
                totalDeclinedTasks={user?.declinedTasks.length}
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
