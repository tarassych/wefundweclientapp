"use client";

import { Container, Typography, Box, Card, CardContent, Button, Chip, Avatar, LinearProgress } from "@mui/material";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function Campaigns() {
  // Placeholder campaign data (DEMO ONLY)
  const campaigns = [
    {
      id: 1,
      title: "Medical Fund for Sarah Johnson (Demo Campaign)",
      description: "Help Sarah cover her medical expenses for cancer treatment. Sarah is a single mother of two who was recently diagnosed with breast cancer. [This is a demo campaign for demonstration purposes only]",
      goal: 15000,
      raised: 8750,
      donors: 234,
      daysLeft: 12,
      category: "Medical",
      image: "M",
      status: "active"
    },
    {
      id: 2,
      title: "Education Fund for Local School (Demo Campaign)",
      description: "Support our local elementary school's technology upgrade. We need new computers and educational software for our students. [This is a demo campaign for demonstration purposes only]",
      goal: 25000,
      raised: 18750,
      donors: 156,
      daysLeft: 8,
      category: "Education",
      image: "E",
      status: "active"
    },
    {
      id: 3,
      title: "Community Garden Project (Demo Campaign)",
      description: "Create a community garden in our neighborhood to provide fresh produce and bring people together. [This is a demo campaign for demonstration purposes only]",
      goal: 8000,
      raised: 8000,
      donors: 89,
      daysLeft: 0,
      category: "Community",
      image: "C",
      status: "completed"
    },
    {
      id: 4,
      title: "Animal Shelter Renovation (Demo Campaign)",
      description: "Help us renovate our local animal shelter to provide better care for abandoned pets and increase adoption rates. [This is a demo campaign for demonstration purposes only]",
      goal: 12000,
      raised: 3200,
      donors: 67,
      daysLeft: 25,
      category: "Animals",
      image: "A",
      status: "active"
    }
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "success";
    if (percentage >= 75) return "primary";
    if (percentage >= 50) return "warning";
    return "error";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "active":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Active Campaigns
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Browse verified and approved fundraising campaigns. All campaigns have been reviewed by our team and beneficiaries have been verified.
          </Typography>
          <Box sx={{ p: 2, bgcolor: "warning.light", borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" color="warning.contrastText">
              <strong>Demo Notice:</strong> The campaigns shown below are demonstration campaigns for testing purposes only. These are not real fundraising campaigns.
            </Typography>
          </Box>
        </Box>

        {campaigns.length > 0 ? (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 4 }}>
            {campaigns.map((campaign) => {
              const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);
              
              return (
                <Card key={campaign.id} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ width: 50, height: 50, mr: 2 }}>{campaign.image}</Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {campaign.title}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Chip 
                            label={campaign.category} 
                            size="small" 
                            variant="outlined" 
                          />
                          <Chip 
                            label={campaign.status === "completed" ? "Completed" : "Active"} 
                            size="small" 
                            color={getStatusColor(campaign.status)}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {campaign.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          ${campaign.raised.toLocaleString()} raised of ${campaign.goal.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {progressPercentage.toFixed(0)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={progressPercentage} 
                        color={getProgressColor(progressPercentage)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {campaign.donors} donors
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : "Campaign ended"}
                      </Typography>
                    </Box>

                    <Button 
                      variant="contained" 
                      fullWidth
                      disabled={campaign.status === "completed"}
                    >
                      {campaign.status === "completed" ? "Campaign Completed" : "Donate Now"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        ) : (
          <Card sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              No Active Campaigns
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              There are currently no active campaigns available. Check back soon for new fundraising opportunities!
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This page displays all verified and approved fundraising campaigns. Each campaign has been reviewed by our team and the beneficiaries have completed identity verification to ensure your donations reach legitimate causes.
            </Typography>
            <Link href="/auth/signin" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ mr: 2 }}>
                Create a Campaign
              </Button>
            </Link>
            <Button variant="outlined">
              Learn More
            </Button>
          </Card>
        )}

        <Box sx={{ mt: 6, p: 4, bgcolor: "grey.50", borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            About Campaign Verification
          </Typography>
          <Typography variant="body1" paragraph>
            All campaigns displayed on this page have undergone our rigorous verification process:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1" paragraph>
              <strong>Campaign Review:</strong> Each campaign is reviewed by our team for legitimacy and compliance
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              <strong>Beneficiary Verification:</strong> Campaign beneficiaries must complete identity verification
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              <strong>Smart Contract Security:</strong> All donations are secured by blockchain smart contracts
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              <strong>Transparent Tracking:</strong> Monitor campaign progress and fund distribution in real-time
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
} 