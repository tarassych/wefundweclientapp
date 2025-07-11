import { ethers } from 'ethers';

// Campaign contract ABI (simplified for multi-campaign contract)
const CAMPAIGN_CONTRACT_ABI = [
  // Create a new campaign
  "function createCampaign(string memory title, string memory description, uint256 goalAmount, address beneficiary, uint256 duration) external returns (uint256 campaignId)",
  
  // Get campaign details
  "function getCampaign(uint256 campaignId) external view returns (string memory title, string memory description, uint256 goalAmount, uint256 raisedAmount, address beneficiary, address creator, uint256 startTime, uint256 endTime, bool isActive, bool goalReached)",
  
  // Get total campaigns count
  "function getTotalCampaigns() external view returns (uint256)",
  
  // Donate to campaign
  "function donate(uint256 campaignId) external payable",
  
  // Withdraw funds (beneficiary only)
  "function withdrawFunds(uint256 campaignId) external",
  
  // Events
  "event CampaignCreated(uint256 indexed campaignId, string title, address indexed creator, address indexed beneficiary, uint256 goalAmount, uint256 startTime, uint256 endTime)",
  "event DonationReceived(uint256 indexed campaignId, address indexed donor, uint256 amount)",
  "event FundsWithdrawn(uint256 indexed campaignId, address indexed beneficiary, uint256 amount)",
  "event GoalReached(uint256 indexed campaignId, uint256 totalRaised)"
];

export interface CampaignCreationParams {
  title: string;
  description: string;
  goalAmountUsd: number;
  beneficiaryAddress: string;
  durationDays: number;
}

export interface CampaignData {
  campaignId: number;
  title: string;
  description: string;
  goalAmount: string;
  raisedAmount: string;
  beneficiary: string;
  creator: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  goalReached: boolean;
}

export class AlchemyService {
  private contract: ethers.Contract;
  private wallet: ethers.Wallet;
  private provider: ethers.Provider;

  constructor() {
    const contractAddress = process.env.CAMPAIGN_CONTRACT_ADDRESS!;
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY!;
    
    if (!contractAddress || !privateKey) {
      throw new Error('Missing contract address or private key in environment variables');
    }

    // Initialize provider and wallet
    this.provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_KEY ? 
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` : 
      'http://localhost:8545'
    );
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(contractAddress, CAMPAIGN_CONTRACT_ABI, this.wallet);
  }

  /**
   * Create a new campaign on the blockchain
   */
  async createCampaign(params: CampaignCreationParams): Promise<number> {
    try {
      // Convert USD amount to wei (assuming 1 ETH = $2000 for demo purposes)
      // In production, you'd use a price oracle
      const ethAmount = params.goalAmountUsd / 2000; // Simplified conversion
      const goalAmountWei = ethers.parseEther(ethAmount.toString());

      // Calculate duration in seconds
      const durationSeconds = params.durationDays * 24 * 60 * 60;

      // Estimate gas
      const gasEstimate = await this.contract.createCampaign.estimateGas(
        params.title,
        params.description,
        goalAmountWei,
        params.beneficiaryAddress,
        durationSeconds
      );

      // Create campaign transaction
      const tx = await this.contract.createCampaign(
        params.title,
        params.description,
        goalAmountWei,
        params.beneficiaryAddress,
        durationSeconds,
        {
          gasLimit: gasEstimate,
          gasPrice: ethers.parseUnits(process.env.GAS_PRICE || '20', 'gwei')
        }
      );

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      
      // Parse the CampaignCreated event to get the campaign ID
      const event = receipt?.logs.find((log: ethers.Log) => {
        try {
          const parsed = this.contract.interface.parseLog(log);
          return parsed?.name === 'CampaignCreated';
        } catch {
          return false;
        }
      });

      if (event) {
        const parsed = this.contract.interface.parseLog(event);
        return parsed?.args[0] as number;
      }

      throw new Error('Campaign created but could not retrieve campaign ID');
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw new Error(`Failed to create campaign: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get campaign details from the blockchain
   */
  async getCampaign(campaignId: number): Promise<CampaignData> {
    try {
      const campaign = await this.contract.getCampaign(campaignId);
      
      return {
        campaignId,
        title: campaign[0],
        description: campaign[1],
        goalAmount: ethers.formatEther(campaign[2]),
        raisedAmount: ethers.formatEther(campaign[3]),
        beneficiary: campaign[4],
        creator: campaign[5],
        startTime: Number(campaign[6]),
        endTime: Number(campaign[7]),
        isActive: campaign[8],
        goalReached: campaign[9]
      };
    } catch (error) {
      console.error('Error getting campaign:', error);
      throw new Error(`Failed to get campaign: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get total number of campaigns
   */
  async getTotalCampaigns(): Promise<number> {
    try {
      const total = await this.contract.getTotalCampaigns();
      return Number(total);
    } catch (error) {
      console.error('Error getting total campaigns:', error);
      throw new Error(`Failed to get total campaigns: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Donate to a campaign
   */
  async donateToCampaign(campaignId: number, amountEth: number): Promise<string> {
    try {
      const amountWei = ethers.parseEther(amountEth.toString());
      
      const gasEstimate = await this.contract.donate.estimateGas(campaignId, {
        value: amountWei
      });

      const tx = await this.contract.donate(campaignId, {
        value: amountWei,
        gasLimit: gasEstimate,
        gasPrice: ethers.parseUnits(process.env.GAS_PRICE || '20', 'gwei')
      });

      const receipt = await tx.wait();
      return receipt?.hash || '';
    } catch (error) {
      console.error('Error donating to campaign:', error);
      throw new Error(`Failed to donate: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get wallet balance
   */
  async getWalletBalance(): Promise<string> {
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      throw new Error(`Failed to get wallet balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice(): Promise<string> {
    try {
      const gasPrice = await this.provider.getFeeData();
      return ethers.formatUnits(gasPrice.gasPrice || 0, 'gwei');
    } catch (error) {
      console.error('Error getting gas price:', error);
      throw new Error(`Failed to get gas price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export function getAlchemyService() {
  return new AlchemyService();
} 