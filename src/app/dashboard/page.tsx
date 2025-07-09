"use client";

import { Container, Typography, Box, Card, CardContent, Avatar, Button, Chip } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <>
        <Navigation />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h6" textAlign="center">
            Loading...
          </Typography>
        </Container>
      </>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome back, {session.user?.name}!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your campaigns and track your donations.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 4, mb: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                3
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Active Campaigns
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                $1,250
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Raised
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                45
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Donors
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                2
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Completed Campaigns
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Your Campaigns
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                  <Avatar sx={{ width: 50, height: 50 }}>M</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      Medical Fund for Sarah
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      $750 raised of $2,000 goal
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip label="Active" color="success" size="small" />
                      <Chip label="75% Complete" variant="outlined" size="small" sx={{ ml: 1 }} />
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                  <Avatar sx={{ width: 50, height: 50 }}>E</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      Education Fund for Local School
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      $500 raised of $1,500 goal
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip label="Active" color="success" size="small" />
                      <Chip label="33% Complete" variant="outlined" size="small" sx={{ ml: 1 }} />
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                  <Avatar sx={{ width: 50, height: 50 }}>C</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      Community Garden Project
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      $800 raised of $800 goal
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip label="Completed" color="primary" size="small" />
                      <Chip label="Funds Released" variant="outlined" size="small" sx={{ ml: 1 }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button variant="contained" fullWidth>
                  Create New Campaign
                </Button>
                <Button variant="outlined" fullWidth>
                  Browse All Campaigns
                </Button>
                <Button variant="outlined" fullWidth>
                  View Donation History
                </Button>
                <Button variant="outlined" fullWidth>
                  Update Profile
                </Button>
                <Button variant="outlined" fullWidth>
                  Contact Support
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Recent Donations
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    Anonymous Donor
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Donated $50 to Medical Fund for Sarah
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  2 hours ago
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    John Smith
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Donated $100 to Education Fund
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  1 day ago
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    Crypto Donor
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Donated 0.05 ETH to Community Garden
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  3 days ago
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
} 