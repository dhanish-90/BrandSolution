export interface SubService {
  name: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  heroTagline: string;
  category: string;
  featuredImage?: string;
  subServices: SubService[];
  benefits: string[];
  suitableCampaigns: string[];
  specs: { label: string; value: string }[];
  accentColor: string;
  galleryItems: {
    title: string;
    location: string;
    caption: string;
    tag: string;
    imageUrl?: string;
    bgGradient: string;
    patternType: 'mural' | 'vehicle' | 'hoarding' | 'signage' | 'retail' | 'event' | 'transit' | 'activation';
  }[];
}

export interface ClientItem {
  id: string;
  name: string;
  sector: string;
  campaignType: string;
  brandColor: string;
  logoUrl?: string;
  tagline?: string;
  reach?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  designation: string;
  companyName: string;
  campaign: string;
   location: string;
  rating: number;
}

export interface CampaignInquiryData {
  fullName: string;
  companyName: string;
  mobileNumber: string;
  emailAddress: string;
  serviceRequired: string;
  campaignType: string;
  startDate: string;
  cityLocation: string;
  unitsOrLocations: string;
  approxSize: string;
  targetArea: string;
  campaignDuration: string;
  designRequirement: string;
  projectDetails: string;
  budget: string;
}
