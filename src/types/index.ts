export interface CheckIn {
  id: string;
  week_start: string;

  // Foundational
  sleep_quality: number | null;
  sleep_quantity: number | null;
  movement: number | null;
  nutrition: number | null;
  hydration: number | null;

  // Cognitive / Occupational
  deep_work: number | null;
  executive_function: number | null;
  cognitive_load: number | null;
  creative_output: number | null;

  // Relational
  social_connection: number | null;
  intimate_relationship: number | null;
  professional_relationships: number | null;

  // Regulatory
  emotional_regulation: number | null;
  sensory_load: number | null;
  stimulation_seeking: number | null;
  avoidance_patterns: number | null;

  // Screen / Gaming
  gaming_recovery_vs_avoidance: number | null;
  screen_time_quality: number | null;

  // Overall
  overall_wellbeing: number | null;

  // Context
  life_events: string | null;
  barriers: string | null;
  notes: string | null;
  gaming_notes: string | null;
  week_type: 'normal' | 'high_load' | 'recovery' | 'transition' | 'crisis' | null;

  created_at: string;
  updated_at: string;
}

export type DomainKey =
  | 'sleep_quality'
  | 'sleep_quantity'
  | 'movement'
  | 'nutrition'
  | 'hydration'
  | 'deep_work'
  | 'executive_function'
  | 'cognitive_load'
  | 'creative_output'
  | 'social_connection'
  | 'intimate_relationship'
  | 'professional_relationships'
  | 'emotional_regulation'
  | 'sensory_load'
  | 'stimulation_seeking'
  | 'avoidance_patterns'
  | 'gaming_recovery_vs_avoidance'
  | 'screen_time_quality'
  | 'overall_wellbeing';

export interface Protocol {
  id: string;
  name: string;
  description: string | null;
  target_domains: string[];
  steps: string | null;
  expected_recovery_weeks: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface TriggerRule {
  id: string;
  protocol_id: string;
  domain: string;
  operator: '<' | '>' | '<=' | '>=';
  threshold: number;
  consecutive_weeks: number;
  created_at: string;
}

export interface ProtocolDeployment {
  id: string;
  protocol_id: string;
  activated_at: string;
  target_domain_scores_at_start: Record<string, number> | null;
  status: 'active' | 'completed' | 'abandoned';
  adherence_rating: number | null;
  outcome_notes: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LifeEvent {
  id: string;
  event_date: string;
  title: string;
  description: string | null;
  impact_domains: string[];
  severity: 'minor' | 'moderate' | 'major';
  created_at: string;
}
