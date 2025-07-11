import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  campaignId: mongoose.Types.ObjectId;
  donorId?: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: 'crypto' | 'fiat';
  transactionHash?: string;
  isAnonymous: boolean;
  donorName?: string;
  donorEmail?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema: Schema = new Schema({
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  donorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  currency: {
    type: String,
    required: true,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['crypto', 'fiat']
  },
  transactionHash: {
    type: String,
    required: false,
    trim: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  donorName: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100
  },
  donorEmail: {
    type: String,
    required: false,
    lowercase: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for better query performance
DonationSchema.index({ campaignId: 1, createdAt: -1 });
DonationSchema.index({ donorId: 1, createdAt: -1 });
DonationSchema.index({ status: 1 });

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema); 