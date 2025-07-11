"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
} from "@mui/material";
import Navigation from "@/components/Navigation";

// Validation schema
const campaignSchema = yup.object({
  title: yup
    .string()
    .required("Campaign title is required")
    .min(10, "Title must be at least 10 characters long")
    .max(100, "Title must be less than 100 characters"),
  description: yup
    .string()
    .required("Campaign description is required")
    .min(50, "Description must be at least 50 characters long")
    .max(2000, "Description must be less than 2000 characters"),
  goalAmountUsd: yup
    .string()
    .required("Goal amount is required")
    .test("is-valid-amount", "Please enter a valid amount greater than $0", (value) => {
      if (!value) return false;
      const amount = parseFloat(value.replace(/[$,]/g, ""));
      return !isNaN(amount) && amount > 0;
    })
    .test("minimum-amount", "Minimum goal amount is $10", (value) => {
      if (!value) return false;
      const amount = parseFloat(value.replace(/[$,]/g, ""));
      return amount >= 10;
    })
    .test("maximum-amount", "Maximum goal amount is $1,000,000", (value) => {
      if (!value) return false;
      const amount = parseFloat(value.replace(/[$,]/g, ""));
      return amount <= 1000000;
    }),
  beneficiaryName: yup
    .string()
    .required("Beneficiary name is required")
    .min(2, "Beneficiary name must be at least 2 characters"),
  beneficiaryEmail: yup
    .string()
    .required("Beneficiary email is required")
    .email("Please enter a valid email address"),
  country: yup
    .string()
    .required("Country is required"),
  payoutMethod: yup
    .string()
    .required("Payout method is required"),
});

type CampaignFormData = yup.InferType<typeof campaignSchema>;

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
];

const payoutMethods = [
  "Bank Transfer",
  "PayPal",
  "Stripe",
  "Crypto Wallet",
  "Check",
  "Wise",
  "Revolut",
];

export default function CreateCampaign() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ campaignId: string; title: string } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CampaignFormData>({
    resolver: yupResolver(campaignSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      goalAmountUsd: "",
      beneficiaryName: "",
      beneficiaryEmail: "",
      country: "",
      payoutMethod: "",
    },
  });

  // Set creator email from session
  useEffect(() => {
    if (session?.user?.email) {
      // Note: creatorEmail is not part of the form validation since it's auto-filled
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const onSubmit = async (data: CampaignFormData) => {
    setIsSubmitting(true);
    setError(null); // Clear any previous errors
    setSuccess(null); // Clear any previous success
    
    try {
      // Call the API to create campaign
      const response = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          creatorEmail: session?.user?.email || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle API error response with proper error formatting
        const errorMessage = result.details 
          ? `${result.error}: ${result.details}`
          : result.error || 'Failed to create campaign';
        throw new Error(errorMessage);
      }

      // Set success state
      setSuccess({
        campaignId: result.campaign.campaignId.toString(),
        title: result.campaign.title
      });
      
      // Redirect to campaigns page after a short delay
      setTimeout(() => {
        router.push('/campaigns');
      }, 3000);
      
    } catch (error) {
      console.error("Error creating campaign:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <>
        <Navigation />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
            <CircularProgress />
          </Box>
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
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Create New Campaign
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          All campaigns are reviewed by our team before going live. You&apos;ll be notified once your campaign is approved.
        </Alert>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            <Typography variant="body1" component="div">
              <strong>Error creating campaign:</strong>
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1 }}>
              {error}
            </Typography>
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body1" component="div">
              <strong>Campaign created successfully!</strong>
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1 }}>
              Campaign ID: {success.campaignId} - {success.title}
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1 }}>
              Redirecting to campaigns page in 3 seconds...
            </Typography>
          </Alert>
        )}

        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Campaign Title */}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.title}>
                    <TextField
                      {...field}
                      label="Public Campaign Title"
                      helperText={errors.title?.message || "Choose a clear, compelling title for your campaign"}
                      required
                    />
                  </FormControl>
                )}
              />

              {/* Campaign Description */}
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.description}>
                    <TextField
                      {...field}
                      label="Campaign Story/Details"
                      helperText={errors.description?.message || "Tell your story and explain how the funds will be used"}
                      multiline
                      rows={6}
                      required
                    />
                  </FormControl>
                )}
              />

              {/* Goal Amount and Creator Email */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Controller
                  name="goalAmountUsd"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ flex: 1, minWidth: 200 }} error={!!errors.goalAmountUsd}>
                      <TextField
                        {...field}
                        label="Goal Amount (USD)"
                        helperText={errors.goalAmountUsd?.message || "e.g., $100.00"}
                        placeholder="$100.00"
                        required
                      />
                    </FormControl>
                  )}
                />
                <FormControl sx={{ flex: 1, minWidth: 200 }}>
                  <TextField
                    label="Creator Email"
                    value={session.user?.email || ""}
                    disabled
                    helperText="Automatically filled from your account"
                  />
                </FormControl>
              </Box>

              {/* Beneficiary Name and Email */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Controller
                  name="beneficiaryName"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ flex: 1, minWidth: 200 }} error={!!errors.beneficiaryName}>
                      <TextField
                        {...field}
                        label="Beneficiary Full Legal Name"
                        helperText={errors.beneficiaryName?.message || "Full legal name of the recipient"}
                        required
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name="beneficiaryEmail"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ flex: 1, minWidth: 200 }} error={!!errors.beneficiaryEmail}>
                      <TextField
                        {...field}
                        label="Beneficiary Email"
                        helperText={errors.beneficiaryEmail?.message || "Contact email for payout"}
                        required
                      />
                    </FormControl>
                  )}
                />
              </Box>

              {/* Country and Payout Method */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ flex: 1, minWidth: 200 }} error={!!errors.country} required>
                      <InputLabel>Country</InputLabel>
                      <Select {...field} label="Country">
                        {countries.map((country) => (
                          <MenuItem key={country.code} value={country.code}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.country && (
                        <FormHelperText>{errors.country.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="payoutMethod"
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ flex: 1, minWidth: 200 }} error={!!errors.payoutMethod} required>
                      <InputLabel>Payout Method</InputLabel>
                      <Select {...field} label="Payout Method">
                        {payoutMethods.map((method) => (
                          <MenuItem key={method} value={method}>
                            {method}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.payoutMethod && (
                        <FormHelperText>{errors.payoutMethod.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => router.back()}
                  disabled={isSubmitting || !!success}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!isValid || isSubmitting || !!success}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                >
                  {isSubmitting ? "Creating..." : "Create Campaign"}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
} 