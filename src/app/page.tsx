import { Container, Typography, Box, Button, Card, CardContent, Grid } from "@mui/material";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            WeFundWe
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            Crypto-Powered Crowdfunding Platform
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Secure, transparent, and decentralized fundraising powered by blockchain technology
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Link href="/auth/signin" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large" sx={{ mr: 2 }}>
                Start a Campaign
              </Button>
            </Link>
            <Link href="/about" style={{ textDecoration: "none" }}>
              <Button variant="outlined" size="large">
                Learn How It Works
              </Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4, mb: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Create Campaign
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Submit your fundraising campaign for review. Our team verifies and approves legitimate causes before they go live.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Smart Contracts
              </Typography>
              <Typography variant="body1" color="text.secondary">
                All donations are secured by blockchain smart contracts, ensuring transparency and automatic distribution when goals are met.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Secure Payouts
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Once campaign goals are reached, funds are automatically released to verified beneficiaries through our secure payment system.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 4, mb: 6 }}>
          <Card sx={{ bgcolor: "primary.main", color: "white" }}>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                For Campaign Creators
              </Typography>
              <Typography variant="body1" paragraph>
                • Submit your cause for review and approval
              </Typography>
              <Typography variant="body1" paragraph>
                • Complete beneficiary verification process
              </Typography>
              <Typography variant="body1" paragraph>
                • Share your campaign link to collect donations
              </Typography>
              <Typography variant="body1" paragraph>
                • Receive funds automatically when goals are met
              </Typography>
              <Link href="/auth/signin" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ bgcolor: "white", color: "primary.main", mt: 2 }}>
                  Create Campaign
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card sx={{ bgcolor: "secondary.main", color: "white" }}>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                For Donors
              </Typography>
              <Typography variant="body1" paragraph>
                • Browse verified and approved campaigns
              </Typography>
              <Typography variant="body1" paragraph>
                • Donate using cryptocurrency or traditional methods
              </Typography>
              <Typography variant="body1" paragraph>
                • Track campaign progress in real-time
              </Typography>
              <Typography variant="body1" paragraph>
                • Ensure your donations reach verified beneficiaries
              </Typography>
              <Button variant="contained" sx={{ bgcolor: "white", color: "secondary.main", mt: 2 }}>
                Browse Campaigns
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ textAlign: "center", py: 4, bgcolor: "grey.50", borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Why Choose WeFundWe?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Unlike traditional crowdfunding platforms, WeFundWe uses blockchain technology to ensure complete transparency, 
            secure fund distribution, and automatic payouts when campaign goals are achieved.
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 2, mt: 3 }}>
            <Box>
              <Typography variant="h6" color="primary">Verified Campaigns</Typography>
              <Typography variant="body2">All campaigns are reviewed and approved</Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary">Smart Contracts</Typography>
              <Typography variant="body2">Automated and transparent fund distribution</Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary">Crypto Ready</Typography>
              <Typography variant="body2">Accept cryptocurrency donations</Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary">Secure Payouts</Typography>
              <Typography variant="body2">Funds released only to verified beneficiaries</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
