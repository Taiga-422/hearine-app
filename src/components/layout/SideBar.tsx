"use client";

import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Assessment as AssessmentIcon,
  RecordVoiceOver as VoiceIcon,
  Person as PersonIcon,
  Poll as PollIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";

const DRAWER_WIDTH = 280;

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    {
      id: "organization-status",
      label: "組織状況",
      icon: <AssessmentIcon />,
      path: "/organization-status",
    },
    {
      id: "employee-voice",
      label: "社員の声",
      icon: <VoiceIcon />,
      path: "/employee-voice",
    },
    {
      id: "one-on-one",
      label: "1on1",
      icon: <PersonIcon />,
      path: "/one-on-one",
    },
    {
      id: "survey",
      label: "アンケート",
      icon: <PollIcon />,
      path: "/survey",
    },
    {
      id: "organization-info",
      label: "組織社員情報",
      icon: <GroupIcon />,
      path: "/organization-info",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": { 
          boxSizing: "border-box", 
          width: DRAWER_WIDTH,
          backgroundColor: "#1f8d6cff", // 緑色の背景
          color: "#ffffff", // 白色のテキスト
        },
      }}
      open
    >
      {/* ヘッダーの高さ分のスペーサー */}
      <Toolbar/>
      
      <Box sx={{ p: 2 }}>
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              sx={{
                cursor: "pointer",
                color: "#ffffff", // アイテムのテキストを白色
                backgroundColor: pathname === item.path ? "rgba(255, 255, 255, 0.1)" : "transparent", // 選択時は半透明の白
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)", // ホバー時は薄い白
                },
                borderRadius: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}> {/* アイコンを白色 */}
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "#ffffff", // テキストを白色
                    fontFamily: "var(--font-geist-sans)",
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}