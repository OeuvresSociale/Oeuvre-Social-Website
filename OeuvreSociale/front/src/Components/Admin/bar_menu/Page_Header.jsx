import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Page_Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textAlign: "left",
          color: "#00194f",
          margin: "20px",
          marginBottom: "0px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          textAlign: "left",
          color: "#999999",
          margin: "20px",
          marginTop: "0",
          marginBottom: "40px",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Page_Header;
