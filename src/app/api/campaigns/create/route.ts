import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Campaign from '@/models/Campaign';
import User from '@/models/User';
import { getAlchemyService } from '@/lib/alchemy';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const {
      title,
      description,
      goalAmountUsd,
      beneficiaryName,
      beneficiaryEmail,
      country,
      payoutMethod
    } = body;

    // Validate required fields
    if (!title || !description || !goalAmountUsd || !beneficiaryName || !beneficiaryEmail || !country || !payoutMethod) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Get or create user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // For demo purposes, we'll use a placeholder beneficiary address
    // In production, you'd need to implement wallet creation or address mapping
    const beneficiaryAddress = process.env.DEPLOYER_ADDRESS || '0x0000000000000000000000000000000000000000';

    // Create campaign on blockchain
    let campaignId: number;
    try {
      const alchemyService = getAlchemyService();
      campaignId = await alchemyService.createCampaign({
        title,
        description,
        goalAmountUsd: parseFloat(goalAmountUsd),
        beneficiaryAddress,
        durationDays: 30 // Default 30 days
      });
    } catch (error) {
      console.error('Blockchain campaign creation failed:', error);
      return NextResponse.json({ 
        error: 'Failed to create campaign on blockchain',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    // Create campaign in database
    const campaign = new Campaign({
      title,
      description,
      goalAmountUsd: parseFloat(goalAmountUsd),
      creatorEmail: session.user.email,
      beneficiaryName,
      beneficiaryEmail,
      country,
      payoutMethod,
      campaignId: campaignId.toString(),
      creatorId: user._id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      isVerified: false,
      totalDonated: 0,
      goalReached: false,
      totalDonations: 0,
      status: 'pending',
      isDemo: false
    });

    await campaign.save();

    return NextResponse.json({
      success: true,
      campaign: {
        id: campaign._id,
        campaignId: campaignId,
        title: campaign.title,
        status: campaign.status
      }
    });

  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 