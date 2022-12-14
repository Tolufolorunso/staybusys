/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { API_URI } from "lib/contant";
import { useAppContext } from "src/context/appContext";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const useApp = useAppContext();
  const [user, setUser] = useState(null);
  const { data, status } = useSession();
  const [image, setImage] = useState("/strans.png");

  useEffect(() => {
    setUser(data?.user);
    setImage(`${API_URI}/${useApp?.user?.image}`);
  }, [status, data, useApp?.user]);

  const { onSidebarOpen, ...other } = props;
  const mobile = useMediaQuery("(max-width:450px)");
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 0,
          },
          width: {
            lg: "calc(100%)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: "82px !important",
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <img src="../../logo.svg" width="130px" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Notifications">
            <IconButton
              sx={{ ml: 1 }}
              style={{
                background: "#fff",
                padding: "8px",
                height: "50px",
                border: "2px solid rgba(47, 46, 64, 0.08)",
                borderRadius: "8px",
              }}
            >
              <Badge badgeContent={4} color="primary" variant="dot">
                <img src="../../bell.svg" width="25px" style={{ color: "#DCDCDC" }} />
              </Badge>
            </IconButton>
          </Tooltip>
          {mobile ? (
            <Avatar
              sx={{
                height: 40,
                width: 40,
                ml: 1,
              }}
              style={{ marginRight: "5px" }}
              src={`${API_URI}/${image}`}
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
          ) : (
            <IconButton
              display={"flex"}
              alignItems={"center"}
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                height: "50px",
                padding: "4px 10px",
                borderRadius: "8px",
                border: "2px solid rgba(47, 46, 64, 0.08)",
              }}
            >
              <Typography style={{ color: "black", fontSize: "13px", textTransform: "capitalize" }}>
                {`${useApp?.user?.firstname} ${useApp?.user?.lastname}`}
              </Typography>
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  ml: 1,
                }}
                // src="/static/images/avatars/avatar_1.png"

                // src={image ? `${API_URI}/${image}` : }
                src={image}
              >
                <UserCircleIcon fontSize="small" />
              </Avatar>
            </IconButton>
          )}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
