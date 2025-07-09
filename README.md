# WeFundWe Client App

A Next.js application for WeFundWe - a crypto-powered crowdfunding platform that combines blockchain technology with traditional fundraising to create secure, transparent, and efficient fundraising campaigns.

## Features

- 🏠 **Public Pages**: Home and About pages explaining the platform
- 🔐 **Google Authentication**: Secure sign-in using NextAuth.js with Google OAuth
- 🛡️ **Protected Dashboard**: User dashboard for campaign management and donation tracking
- 🎨 **Modern UI**: Beautiful interface built with Material-UI (MUI)
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized for speed
- 💰 **Crowdfunding Platform**: Campaign creation, management, and donation tracking
- 🔗 **Smart Contracts**: Blockchain-powered fund distribution and transparency

## Platform Overview

WeFundWe is a revolutionary crowdfunding platform that operates like GoFundMe but with blockchain technology:

1. **Campaign Submission**: Users submit fundraising campaigns for review
2. **Admin Approval**: Campaigns are reviewed and approved by administrators
3. **Beneficiary Verification**: Campaign beneficiaries must register and verify their identity
4. **Campaign Launch**: Approved campaigns go live with shareable links
5. **Donation Collection**: Donors can contribute using cryptocurrency or traditional methods
6. **Smart Contract Distribution**: Funds are automatically released when goals are met

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Authentication**: NextAuth.js
- **Styling**: MUI + CSS-in-JS
- **Blockchain**: Smart contracts for fund distribution
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wefundweclientapp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add `http://localhost:3000/api/auth/callback/google` to the authorized redirect URIs
6. Copy the Client ID and Client Secret to your `.env.local` file

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   ├── auth/signin/page.tsx             # Sign-in page
│   ├── dashboard/page.tsx               # Protected dashboard
│   ├── about/page.tsx                   # About page
│   ├── page.tsx                         # Home page
│   ├── layout.tsx                       # Root layout
│   └── globals.css                      # Global styles
├── components/
│   ├── Navigation.tsx                   # Navigation component
│   ├── Providers.tsx                    # NextAuth provider
│   └── ThemeRegistry.tsx                # MUI theme provider
├── types/
│   └── next-auth.d.ts                   # TypeScript types
└── middleware.ts                        # Auth middleware
```

## Pages

### Public Pages
- **Home** (`/`): Landing page explaining the platform and how it works
- **About** (`/about`): Detailed information about the platform, process, and blockchain technology

### Authentication
- **Sign In** (`/auth/signin`): Google OAuth sign-in page

### Protected Pages
- **Dashboard** (`/dashboard`): User dashboard with campaign management and donation tracking (requires authentication)

## Platform Features

### For Campaign Creators
- Submit campaigns for review and approval
- Complete beneficiary verification process
- Share campaign links to collect donations
- Track campaign progress and funds raised
- Receive automatic payouts when goals are met

### For Donors
- Browse verified and approved campaigns
- Donate using cryptocurrency or traditional methods
- Track campaign progress in real-time
- Ensure donations reach verified beneficiaries
- View transaction history and impact

### Blockchain Integration
- **Smart Contracts**: All donations secured by blockchain smart contracts
- **Transparency**: Every transaction recorded on the blockchain
- **Automation**: Automatic fund distribution when conditions are met
- **Security**: Funds cannot be accessed without meeting predefined conditions

## Authentication Flow

1. Users can browse public pages without authentication
2. When accessing protected pages, users are redirected to sign-in
3. After successful Google authentication, users are redirected to the dashboard
4. The navigation bar shows different options based on authentication status

## Customization

### Styling
The application uses MUI's theming system. You can customize the theme in `src/components/ThemeRegistry.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Your primary color
    },
    secondary: {
      main: "#dc004e", // Your secondary color
    },
  },
});
```

### Adding New Pages
1. Create a new directory in `src/app/` for your page
2. Add a `page.tsx` file with your component
3. Import and use the `Navigation` component for consistent layout

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes |
| `NEXTAUTH_URL` | Your application URL | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
