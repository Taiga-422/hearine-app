"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, ExitToApp, Apps } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  // プロフィールメニュー用のハンドラー
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  // メニューボタン用のハンドラー
  const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleProfile = () => {
    // プロフィールページへの遷移処理
    console.log("プロフィールページへ遷移");
    handleProfileMenuClose();
  };

  // メニュー項目のハンドラー
  const handleEmployeeProfile = () => {
    console.log("社員プロファイルページへ遷移");
    // router.push("/companyId/employee-profile");
    handleMainMenuClose();
  };

  const handleOrgChart = () => {
    console.log("組織体制図ページへ遷移");
    // router.push("/companyId/org-chart");
    handleMainMenuClose();
  };

  const handleCeoAI = () => {
    console.log("社長AIページへ遷移");
    // router.push("/companyId/ceo-ai");
    handleMainMenuClose();
  };

  const handleCompanyInfo = () => {
    console.log("会社情報ページへ遷移");
    // router.push("/companyId/company-info");
    handleMainMenuClose();
  };

  const handleLogout = () => {
    // ログアウト処理
    console.log("ログアウト処理");
    handleProfileMenuClose();
    // 実際のログアウト処理をここに実装
    // router.push('/login');
  };

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMainMenuOpen = Boolean(menuAnchorEl);

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
            color: '#1db584',
          }}
          onClick={() => router.push("/companyId")}
        >
          Hearin
        </Typography>

        {/* 右端: 各メニュー */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* メニューボタン */}
            <IconButton
            edge="end"
            aria-label="main menu"
            aria-controls="main-menu"
            aria-haspopup="true"
            onClick={handleMainMenuOpen}
            sx={{ 
              color: "#ffffff",
              backgroundColor: "#ffa939ff",
              "&:hover": {
              backgroundColor: "#e6952e"
              }
            }}
            >
              <Apps />
            </IconButton>

            {/* プロフィールボタン */}
            <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="profile"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{ 
              color: "#ffffff",
              ml: 1,
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

        {/* メインメニュー */}
        <Menu
          id="main-menu"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMainMenuOpen}
          onClose={handleMainMenuClose}
        >
          <MenuItem onClick={handleEmployeeProfile}>
            社員プロファイル
          </MenuItem>
          <MenuItem onClick={handleOrgChart}>
            組織体制図
          </MenuItem>
          <MenuItem onClick={handleCeoAI}>
            社長AI
          </MenuItem>
          <MenuItem onClick={handleCompanyInfo}>
            会社情報
          </MenuItem>
        </Menu>

        {/* プロフィールメニュー */}
        <Menu
          id="profile"
          anchorEl={profileAnchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isProfileMenuOpen}
          onClose={handleProfileMenuClose}
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