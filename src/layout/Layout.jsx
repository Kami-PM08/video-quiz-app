import React from "react";
// Components
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Grid container justifyContent="center">
      <Outlet />
    </Grid>
  );
};

export default Layout;
