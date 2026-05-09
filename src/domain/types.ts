// ============================================
// DOMAIN LAYER - Entities and Types
// No external dependencies allowed here
// ============================================

export interface GeneralSettings {
  studioName: string;
  logo: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  primaryColor: string;
  autoScrollInterval: number;
  pin: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

export interface PrintSizeItem {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: 'cm' | 'in';
  price: number;
  image?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  requirements: string;
  price: number;
  processingTime: string;
  icon: string;
}

export interface PortfolioImage {
  id: string;
  src: string;
  category: string;
  featured: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: 'golden' | 'navy' | 'green' | 'red';
  originalPrice: number;
  promotionalPrice: number;
  validityType: 'always' | 'daterange';
  startDate?: string;
  endDate?: string;
  conditions: string;
  whatsappMessage: string;
  active: boolean;
}

export interface ScheduleDay {
  day: string;
  openTime: string;
  closeTime: string;
  closed: boolean;
}

export interface SectionContent {
  services?: ServiceItem[];
  printSizes?: PrintSizeItem[];
  documents?: DocumentItem[];
  portfolioImages?: PortfolioImage[];
  offers?: OfferItem[];
  schedule?: ScheduleDay[];
  mapUrl?: string;
  landmark?: string;
  ctaText?: string;
  whatsappMessage?: string;
  showLogo?: boolean;
}

export interface Section {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  content: SectionContent;
  isVisible: boolean;
  lastModified: number;
}

export interface UIState {
  activeDashboardTab: string;
  sidebarCollapsed: boolean;
  unsavedChanges: string[];
  previewMode: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  loginTimestamp: number | null;
}

export interface AppState {
  general: GeneralSettings;
  sections: Section[];
  ui: UIState;
  auth: AuthState;
}

// Dashboard menu item type
export interface DashboardMenuItem {
  id: string;
  label: string;
  icon: string;
  sectionId?: number;
}
