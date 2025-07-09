"use client";

import { Container, Typography, Box, Button, Paper, Divider } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <>
        <Navigation />
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h6" textAlign="center">
            Loading...
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Sign In
          </Typography>
          
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
            Welcome to WeFundWe. Sign in to access your dashboard and start making a difference.
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Choose your sign-in method
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              sx={{
                py: 1.5,
                borderColor: "#4285f4",
                color: "#4285f4",
                "&:hover": {
                  borderColor: "#3367d6",
                  backgroundColor: "rgba(66, 133, 244, 0.04)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285f4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34a853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#ea4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Box>
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
} 