import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SeverityPill } from "../severity-pill";

const orders = [
  {
    id: uuid(),
    earning: "1890.19",
    amount: 30.5,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1890.19",
    amount: 30.5,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1890.19",
    amount: 30.5,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1286.90",
    amount: 25.1,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1555016400000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "1287.19",
    amount: 10.99,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554930000000,
    status: "refunded",
  },
  {
    id: uuid(),
    earning: "1390.09",
    amount: 96.43,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1298.90",
    amount: 32.54,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "1390.09",
    amount: 96.43,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1298.90",
    amount: 32.54,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "1390.09",
    amount: 96.43,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1298.90",
    amount: 32.54,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "1390.09",
    amount: 96.43,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1298.90",
    amount: 32.54,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "1390.09",
    amount: 96.43,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1298.90",
    amount: 32.54,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "1390.09",
    amount: 96.43,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1298.90",
    amount: 32.54,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "12434.90",
    amount: 96.43,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    earning: "1298.90",
    amount: 32.54,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "1244.89",
    amount: 16.76,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    earning: "1244.89",
    amount: 16.76,
    customer: {
      name: "Auditing information architechture",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
];

export const LatestOrders = (props) => {
  const { submissions } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);
  const mobile = useMediaQuery("(max-width:850px)");
  return (
    <>
      <Card
        className="cardshead"
        style={{
          borderRadius: "22px",
          boxShadow: "-5px 5px 20px rgba(51, 60, 193, 0.16),",
          padding: "10px",
        }}
        {...props}
      >
        <Box
          className="table_boxs"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CardHeader className="tableHeader" title="Your Earnings" />
          <Box>
            {" "}
            <Typography
              className="currency_euro"
              style={{ border: "1px solid #FDA741", borderRadius: "10px", padding: "20px" }}
              variant="overline"
            >
              Currency: Euro ($)
            </Typography>{" "}
          </Box>
        </Box>
        <PerfectScrollbar style={{ marginTop: "20px" }}>
          {mobile ? (
            <Table>
              <TableBody>
                <>
                  {submissions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((submission) => (
                      <TableRow
                        hover
                        style={{ background: "#F4F4F4", border: "6px solid white" }}
                        key={submission._id}
                      >
                        <TableCell>
                          <span
                            style={{
                              color: "#181818;",
                              fontSize: "16px",
                              fontFamily: "Almarena",
                              fontWeight: 900,
                            }}
                          >
                            {" "}
                            {submission.taskId.title}
                          </span>{" "}
                          <br />
                          <br />
                          <span style={{ color: "#576271", fontSize: "14px" }}>
                            {" "}
                            {format(new Date(submission.taskId.createdAt), "dd - MM - yyyy")}
                          </span>
                        </TableCell>

                        <TableCell style={{ textAlign: "end" }}>
                          <span style={{ color: "#181818;", fontSize: "16px", textAlign: "end" }}>
                            {" "}
                            {submission.taskId.price}
                          </span>
                          <br /> <br />
                          <SeverityPill
                            color={
                              (submission.status === "delivered" && "success") ||
                              (submission.status === "refunded" && "error") ||
                              "warning"
                            }
                          >
                            {submission.status}
                          </SeverityPill>
                        </TableCell>
                      </TableRow>
                    ))}
                  <br /> <br />
                </>
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>Earnings</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((submission) => (
                      <TableRow hover key={submission._id}>
                        <TableCell>{submission.taskId.title}</TableCell>
                        <TableCell>{submission.taskId.price}</TableCell>
                        <TableCell>{format(new Date(submission.taskId.createdAt), "dd - MM - yyyy")}</TableCell>
                        {/* <TableCell>{new Date(submission.taskId.createdAt).toDateString()}</TableCell> */}
                        <TableCell>
                          <SeverityPill
                            color={
                              (submission.status === "completed" && "success") ||
                              (submission.status === "refunded" && "error") ||
                              "warning"
                            }
                          >
                            {submission.status}
                          </SeverityPill>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </PerfectScrollbar>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 3,
        }}
        style={{ paddingTop: "70px" }}
      >
        <Pagination
          boundaryCount={2}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          style={{ marginTop: "10px !important" }}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};
