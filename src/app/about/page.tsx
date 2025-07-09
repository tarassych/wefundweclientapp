import { Container, Typography, Box, Paper, Stepper, Step, StepLabel, StepContent } from "@mui/material";
import Navigation from "@/components/Navigation";

export default function About() {
  const steps = [
    {
      label: 'Campaign Submission',
      description: 'Campaign creators submit their fundraising requests with detailed information about their cause, goals, and intended use of funds.'
    },
    {
      label: 'Admin Review & Approval',
      description: 'Our team reviews each campaign for legitimacy, feasibility, and compliance with our guidelines. Only approved campaigns proceed to the next stage.'
    },
    {
      label: 'Beneficiary Verification',
      description: 'Campaign beneficiaries must register and complete identity verification to ensure they are legitimate recipients of the funds.'
    },
    {
      label: 'Campaign Launch',
      description: 'Once approved and verified, campaigns go live with a shareable link that can be distributed to potential donors.'
    },
    {
      label: 'Donation Collection',
      description: 'Donors can contribute using cryptocurrency or traditional payment methods. All transactions are secured by blockchain smart contracts.'
    },
    {
      label: 'Goal Achievement & Payout',
      description: 'When campaign goals are met, funds are automatically released to verified beneficiaries through our secure payment system.'
    }
  ];

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About WeFundWe
        </Typography>
        
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            WeFundWe is a revolutionary crowdfunding platform that combines the power of blockchain technology with traditional fundraising to create a secure, transparent, and efficient way to raise funds for legitimate causes. We bridge the gap between campaign creators and donors while ensuring that every dollar reaches its intended beneficiary.
          </Typography>
        </Paper>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Our platform operates on a sophisticated yet simple process that ensures transparency, security, and trust for all parties involved:
          </Typography>
          
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label} active={true}>
                <StepLabel>
                  <Typography variant="h6">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Blockchain Technology
          </Typography>
          <Typography variant="body1" paragraph>
            WeFundWe leverages blockchain smart contracts to ensure complete transparency and automatic fund distribution. Here's how it works:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1" paragraph>
              <strong>Smart Contracts:</strong> All donations are held in blockchain smart contracts that automatically execute when campaign conditions are met.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              <strong>Transparency:</strong> Every transaction is recorded on the blockchain, providing complete visibility into fund flow and usage.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              <strong>Security:</strong> Funds cannot be accessed or modified without meeting the predefined conditions in the smart contract.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              <strong>Automation:</strong> Payouts are triggered automatically when campaign goals are achieved, eliminating manual intervention and potential delays.
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Our Values
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Transparency
              </Typography>
              <Typography variant="body1" paragraph>
                Every transaction and campaign detail is publicly verifiable on the blockchain, ensuring complete transparency for donors and beneficiaries.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Security
              </Typography>
              <Typography variant="body1" paragraph>
                Advanced blockchain technology and smart contracts protect funds from fraud, ensuring they reach only verified beneficiaries.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Trust
              </Typography>
              <Typography variant="body1" paragraph>
                Rigorous verification processes and automated systems build trust between campaign creators, donors, and beneficiaries.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                Innovation
              </Typography>
              <Typography variant="body1" paragraph>
                We continuously innovate to provide the most efficient, secure, and user-friendly crowdfunding experience possible.
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Key Features
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                🔍 Campaign Verification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All campaigns undergo thorough review and approval processes to ensure legitimacy.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                👤 Identity Verification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Beneficiaries must complete identity verification before receiving funds.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                💰 Crypto & Traditional Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accept donations in cryptocurrency or traditional payment methods.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                📊 Real-time Tracking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor campaign progress and fund distribution in real-time.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                🤖 Automated Payouts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Smart contracts automatically release funds when goals are met.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                🔗 Shareable Links
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Easy-to-share campaign links for maximum reach and visibility.
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Join the Future of Crowdfunding
          </Typography>
          <Typography variant="body1" paragraph>
            Whether you're looking to create a campaign for a worthy cause or want to support others through secure, transparent donations, WeFundWe provides the platform you need. Our blockchain-powered system ensures that your contributions make a real difference while maintaining complete transparency and security.
          </Typography>
          <Typography variant="body1" paragraph>
            Join thousands of users who are already leveraging the power of blockchain technology to create positive change in the world. Start your journey with WeFundWe today.
          </Typography>
        </Paper>
      </Container>
    </>
  );
} 