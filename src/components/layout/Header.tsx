"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // プロフィールページへの遷移処理
    console.log("プロフィールページへ遷移");
    handleMenuClose();
  };

  const handleLogout = () => {
    // ログアウト処理
    console.log("ログアウト処理");
    handleMenuClose();
    // 実際のログアウト処理をここに実装
    // router.push('/login');
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ffffff", // 白色に変更
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", // 影を追加して視認性を向上
      }}
    >
      <Toolbar>
        {/* 左端: Hearinロゴ */}
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            cursor: "pointer",
            color: "#1f8d6cff",
          }}
          onClick={() => router.push("/")}
        >
          Hearin
        </Typography>

        {/* 右端: プロフィールとログアウト */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* プロフィールボタン */}
            <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{ 
              color: "#ffffff",
              backgroundColor: "#ffa939ff",
              "&:hover": {
              backgroundColor: "#e6952e"
              }
            }}
            >
            <AccountCircle />
            </IconButton>

            {/* ログアウトボタン */}
            <IconButton
            onClick={handleLogout}
            sx={{
              color: "#ffffff", // 文字色を白に変更
              backgroundColor: "#ffa939ff", // 背景をオレンジに変更
              ml: 1, // 左にマージンを追加
              "&:hover": {
              backgroundColor: "#e6952e" // ホバー時の背景色
              }
            }}
            >
            <ExitToApp />
            </IconButton>
          </Box>

        {/* プロフィールメニュー */}
        <Menu
          id="primary-search-account-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem 
            onClick={handleProfile}
          >
            <AccountCircle sx={{ mr: 1 }} />
            プロフィール
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}