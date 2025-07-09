"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navigation() {
  const { data: session, status } = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            WeFundWe
          </Link>
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/campaigns" style={{ textDecoration: "none" }}>
            <Button color="inherit">Campaigns</Button>
          </Link>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <Button color="inherit">About</Button>
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
              <Button 
                color="inherit" 
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
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