"use client";

import { Typography, Button } from "@mui/material";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Hearine UI へようこそ！
      </Typography>
      <Button variant="contained" color="primary">
        はじめる
      </Button>
    </main>
  );
}
