import React from 'react';
import {
  Box,
} from "@mui/material";
import Header from '@/components/layout/Header';

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", fontFamily: "var(--font-geist-sans)" }}>
      {/* ヘッダー */}
      <Header />
      
      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "calc(100vh - 64px)",
          mt: 3,
          p: 4,
          backgroundColor: "#f0f8f0",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}