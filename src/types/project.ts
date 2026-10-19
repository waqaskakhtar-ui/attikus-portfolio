export type ProjectCategory = 'all' | 'feature' | 'short' | 'commercial' | 'editorial' | 'music_video';

export interface ProjectTechnicalSpecs {
  camera: string;
  lenses: string;
  aspectRatio: string;
  runtime?: string;
  colorGrade?: string;
  locations?: string;
}

export interface ProjectMedia {
  heroImage: string;
  thumbnail: string;
  videoUrl?: string;
  galleryImages?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number;
  client?: string;
  role: string;
  logline: string;
  synopsis?: string;
  technicalSpecs: ProjectTechnicalSpecs;
  laurels?: string[];
  media: ProjectMedia;
  featured: boolean;
  accentQuote?: string;
}

export interface PhotographyItem {
  id: string;
  title: string;
  series: string;
  year: number;
  imageUrl: string;
  aspectRatio: '2:3' | '16:9' | '4:5' | '1:1';
  specs: {
    camera: string;
    lens: string;
    lighting: string;
  };
  featured: boolean;
}
