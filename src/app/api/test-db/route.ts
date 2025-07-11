import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Campaign from '@/models/Campaign';

export async function GET() {
  try {
    await dbConnect();
    
    // Test query to get campaign count
    const campaignCount = await Campaign.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully',
      campaignCount
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 