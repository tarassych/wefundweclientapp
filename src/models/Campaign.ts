import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaign extends Document {
  title: string;
  description: string;
  goalAmountUsd: number;
  creatorEmail: string;
  beneficiaryName: string;
  beneficiaryEmail: string;
  country: string;
  payoutMethod: string;
  isVerified: boolean;
  campaignId?: string; // ID returned from Alchemy
  totalDonated: number;
  goalReached: boolean;
  totalDonations: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'cancelled';
  creatorId: mongoose.Types.ObjectId;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  donors: number;
  isDemo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  goalAmountUsd: {
    type: Number,
    required: true,
    min: 1
  },
  creatorEmail: {
    type: String,
    required: true,
    trim: true
  },
  beneficiaryName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  beneficiaryEmail: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  payoutMethod: {
    type: String,
    required: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  campaignId: {
    type: String,
    required: false,
    trim: true
  },
  totalDonated: {
    type: Number,
    default: 0,
    min: 0
  },
  goalReached: {
    type: Boolean,
    default: false
  },
  totalDonations: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  donors: {
    type: Number,
    default: 0
  },
  isDemo: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
CampaignSchema.index({ status: 1, createdAt: -1 });
CampaignSchema.index({ isVerified: 1, status: 1 });
CampaignSchema.index({ creatorId: 1, createdAt: -1 });
CampaignSchema.index({ beneficiaryEmail: 1 });

export default mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema); 