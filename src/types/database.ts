// ============================================================================
// THE YACINEVERSE — Database & Domain Types
// Generated for Canonical Supabase PostgreSQL Schema (13 Tables)
// ============================================================================

export type ContentStatus = 'draft' | 'published' | 'archived';
export type SectorType = 'core_systems' | 'ai_intelligence' | 'engineering' | 'creations' | 'origins';
export type MediaType = 'image' | 'video' | 'document' | 'audio' | 'model_3d';
export type CredentialType = 'certification' | 'degree' | 'license' | 'award';
export type InquiryStatus = 'unread' | 'read' | 'replied' | 'spam';

export interface ImpactMetric {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface MediaAsset {
  id: string;
  storage_path: string;
  public_url: string;
  media_type: MediaType;
  mime_type: string;
  file_size_bytes: number;
  width?: number | null;
  height?: number | null;
  focal_x: number;
  focal_y: number;
  blur_data_url?: string | null;
  alt_text: string;
  caption?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  is_top_skill: boolean;
  display_order: number;
  is_visible: boolean;
  icon_slug?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  organization_url?: string | null;
  employment_type: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  highlights: string[];
  status: ContentStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  credential_type: CredentialType;
  issue_date: string;
  expiration_date?: string | null;
  credential_url?: string | null;
  credential_id_number?: string | null;
  certificate_media_id?: string | null;
  status: ContentStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
  certificate_media?: MediaAsset | null;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  sector: SectorType;
  status: ContentStatus;
  is_featured: boolean;
  is_flagship: boolean;
  cover_image_id?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  challenge_narrative?: string | null;
  solution_narrative?: string | null;
  architecture_overview?: string | null;
  impact_metrics: ImpactMetric[];
  display_order: number;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  cover_image?: MediaAsset | null;
  skills?: Skill[];
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_mdx: string;
  read_time_minutes: number;
  cover_image_id?: string | null;
  tags: string[];
  status: ContentStatus;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  cover_image?: MediaAsset | null;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content_mdx: string;
  media_id?: string | null;
  status: ContentStatus;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  media?: MediaAsset | null;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string | null;
  milestone_date: string;
  linked_experience_id?: string | null;
  linked_project_id?: string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  ip_hash: string;
  user_agent?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  diff_payload: Record<string, unknown>;
  ip_address?: string | null;
  created_at: string;
}

export interface SlugRedirect {
  id: string;
  source_path: string;
  target_path: string;
  status_code: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
