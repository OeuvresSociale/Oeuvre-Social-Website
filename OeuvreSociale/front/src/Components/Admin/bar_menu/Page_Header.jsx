import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Page_Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color="#00194f"
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color="#999999">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Page_Header;
