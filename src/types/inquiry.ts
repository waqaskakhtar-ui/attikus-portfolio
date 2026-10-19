export type ProjectType = 'feature' | 'commercial' | 'music_video' | 'editorial_photo';
export type EstimatedTimeline = 'immediate' | '1-3_months' | 'quarter_out' | 'exploratory';
export type BudgetTier = '$10k-$25k' | '$25k-$50k' | '$50k-$100k' | '$100k+';

export interface ProductionInquiry {
  clientName: string;
  clientEmail: string;
  companyOrArtist: string;
  projectType: ProjectType;
  estimatedTimeline: EstimatedTimeline;
  budgetTier: BudgetTier;
  deliverables: string[];
  projectNotes: string;
  websiteConfirmField?: string;
}

export interface InquirySubmissionResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
}
