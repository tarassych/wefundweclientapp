"use client";

import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, Divider, ListItemText } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getInitial = (name?: string | null) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            WeFundWe
          </Link>
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <Button color="inherit">About</Button>
          </Link>

          <Link href="/campaigns" style={{ textDecoration: "none" }}>
            <Button color="inherit">Campaigns</Button>
          </Link>
          
          {status === "loading" ? (
            <Button color="inherit" disabled>
              Loading...
            </Button>
          ) : session ? (
            <>
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <Button color="inherit">Dashboard</Button>
              </Link>
              <Avatar
                sx={{ ml: 1, cursor: "pointer", bgcolor: "primary.main" }}
                src={session.user?.image ?? undefined}
                alt={session.user?.name ?? "User"}
                onClick={handleAvatarClick}
              >
                {!session.user?.image && getInitial(session.user?.name)}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: { minWidth: 220, mt: 1 },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", p: 2, pt: 1, pb: 1 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                      {session.user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {session.user?.email}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  <ListItemText>Sign Out</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/auth/signin" style={{ textDecoration: "none" }}>
              <Button color="inherit">Sign In</Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 