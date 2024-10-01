import { Box, Grid2 } from "@mui/material";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid2 container spacing={1} columns={{ xs: 4, sm: 12, md: 12 }}>
        {children}
      </Grid2>
    </Box>
  );
}
