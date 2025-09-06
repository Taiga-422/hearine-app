"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Assessment as AssessmentIcon,
  RecordVoiceOver as VoiceIcon,
  Person as PersonIcon,
  Poll as PollIcon,
  Group as GroupIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";

const DRAWER_WIDTH = 200;
const DRAWER_CLOSED_WIDTH = 72;

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export default function SideBar() {
  const [open, setOpen] = useState(true);
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

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_CLOSED_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "width 0.3s",
        "& .MuiDrawer-paper": { 
          boxSizing: "border-box", 
          width: open ? DRAWER_WIDTH : DRAWER_CLOSED_WIDTH,
          backgroundColor: "#1f8d6cff",
          color: "#ffffff",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
      open={open}
    >
      {/* ヘッダーの高さ分のスペーサー */}
      <Toolbar/>
      
      {/* 開閉ボタン */}
      <Box sx={{ display: "flex", justifyContent: open ? "flex-end" : "center", p: 1 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#ffffff" }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      
      <Box>
        <List>
          {sidebarItems.map((item) => (
            <Tooltip
              key={item.id}
              title={open ? "" : item.label}
              placement="right"
              arrow
            >
              <ListItem
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: "pointer",
                  color: "#ffffff",
                  height: 50,
                  backgroundColor: pathname === item.path ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: "#ffffff",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText 
                    primary={item.label}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "#ffffff",
                      }
                    }}
                  />
                )}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}