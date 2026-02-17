import type { DomainKey } from '../types';

export type DomainCategory =
  | 'foundational'
  | 'cognitive'
  | 'relational'
  | 'regulatory'
  | 'screen'
  | 'overall';

export interface DomainConfig {
  key: DomainKey;
  label: string;
  shortLabel: string;
  description: string;
  category: DomainCategory;
  bodyRegion: string;
  color: string;
  invertScale?: boolean;
}

export const DOMAINS: DomainConfig[] = [
  // Foundational
  {
    key: 'sleep_quality',
    label: 'Sleep Quality',
    shortLabel: 'Sleep Q',
    description: 'Subjective sleep quality this week',
    category: 'foundational',
    bodyRegion: 'head',
    color: '#6366f1',
  },
  {
    key: 'sleep_quantity',
    label: 'Sleep Quantity',
    shortLabel: 'Sleep Qty',
    description: 'Hours relative to your target',
    category: 'foundational',
    bodyRegion: 'head',
    color: '#818cf8',
  },
  {
    key: 'movement',
    label: 'Movement / Exercise',
    shortLabel: 'Movement',
    description: 'Volume and consistency of physical activity',
    category: 'foundational',
    bodyRegion: 'limbs',
    color: '#22c55e',
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    shortLabel: 'Nutrition',
    description: 'Alignment with dietary goals',
    category: 'foundational',
    bodyRegion: 'limbs',
    color: '#4ade80',
  },
  {
    key: 'hydration',
    label: 'Hydration',
    shortLabel: 'Hydration',
    description: 'Adequate fluid intake',
    category: 'foundational',
    bodyRegion: 'limbs',
    color: '#34d399',
  },
  // Cognitive / Occupational
  {
    key: 'deep_work',
    label: 'Deep Work Capacity',
    shortLabel: 'Deep Work',
    description: 'Ability to sustain focused, meaningful work',
    category: 'cognitive',
    bodyRegion: 'head',
    color: '#8b5cf6',
  },
  {
    key: 'executive_function',
    label: 'Executive Function',
    shortLabel: 'Exec Func',
    description: 'Ease of task initiation, switching, completion',
    category: 'cognitive',
    bodyRegion: 'head',
    color: '#a78bfa',
  },
  {
    key: 'cognitive_load',
    label: 'Cognitive Bandwidth',
    shortLabel: 'Cog Load',
    description: 'How much mental capacity you had available',
    category: 'cognitive',
    bodyRegion: 'head',
    color: '#7c3aed',
  },
  {
    key: 'creative_output',
    label: 'Creative Output',
    shortLabel: 'Creative',
    description: 'Generative thinking, writing, building',
    category: 'cognitive',
    bodyRegion: 'head',
    color: '#c084fc',
  },
  // Relational
  {
    key: 'social_connection',
    label: 'Social Connection',
    shortLabel: 'Social',
    description: 'Quality of friendships and community',
    category: 'relational',
    bodyRegion: 'chest',
    color: '#f59e0b',
  },
  {
    key: 'intimate_relationship',
    label: 'Partnership / Intimacy',
    shortLabel: 'Partner',
    description: 'Connection with partner',
    category: 'relational',
    bodyRegion: 'chest',
    color: '#fbbf24',
  },
  {
    key: 'professional_relationships',
    label: 'Professional Relationships',
    shortLabel: 'Prof Rel',
    description: 'Team, clients, collaborators',
    category: 'relational',
    bodyRegion: 'chest',
    color: '#f97316',
  },
  // Regulatory
  {
    key: 'emotional_regulation',
    label: 'Emotional Regulation',
    shortLabel: 'Emo Reg',
    description: 'Ability to manage emotional responses',
    category: 'regulatory',
    bodyRegion: 'gut',
    color: '#ef4444',
  },
  {
    key: 'sensory_load',
    label: 'Sensory Load',
    shortLabel: 'Sensory',
    description: 'How overwhelmed vs. regulated sensorily',
    category: 'regulatory',
    bodyRegion: 'gut',
    color: '#f87171',
    invertScale: true,
  },
  {
    key: 'stimulation_seeking',
    label: 'Stimulation Seeking',
    shortLabel: 'Stim Seek',
    description: 'Degree of seeking high-stim activities',
    category: 'regulatory',
    bodyRegion: 'gut',
    color: '#fb923c',
    invertScale: true,
  },
  {
    key: 'avoidance_patterns',
    label: 'Avoidance Patterns',
    shortLabel: 'Avoidance',
    description: 'Extent of procrastination / withdrawal behaviors',
    category: 'regulatory',
    bodyRegion: 'gut',
    color: '#dc2626',
    invertScale: true,
  },
  // Screen / Gaming
  {
    key: 'gaming_recovery_vs_avoidance',
    label: 'Gaming: Recovery ↔ Avoidance',
    shortLabel: 'Gaming',
    description: 'Subjective sense of whether gaming was restorative or avoidant',
    category: 'screen',
    bodyRegion: 'head',
    color: '#06b6d4',
  },
  {
    key: 'screen_time_quality',
    label: 'Screen Time Quality',
    shortLabel: 'Screen Q',
    description: 'Intentional consumption vs. passive scrolling',
    category: 'screen',
    bodyRegion: 'head',
    color: '#22d3ee',
  },
  // Overall
  {
    key: 'overall_wellbeing',
    label: 'Overall Wellbeing',
    shortLabel: 'Overall',
    description: 'Gut-feel summary score for the week',
    category: 'overall',
    bodyRegion: 'full',
    color: '#3b82f6',
  },
];

export const DOMAIN_CATEGORIES: Record<
  DomainCategory,
  { label: string; color: string; bodyRegions: string[] }
> = {
  foundational: { label: 'Foundational', color: '#22c55e', bodyRegions: ['limbs'] },
  cognitive: { label: 'Cognitive / Occupational', color: '#8b5cf6', bodyRegions: ['head'] },
  relational: { label: 'Relational', color: '#f59e0b', bodyRegions: ['chest'] },
  regulatory: { label: 'Regulatory', color: '#ef4444', bodyRegions: ['gut'] },
  screen: { label: 'Screen / Gaming', color: '#06b6d4', bodyRegions: ['head'] },
  overall: { label: 'Overall', color: '#3b82f6', bodyRegions: ['full'] },
};

export function getDomainsByCategory(category: DomainCategory): DomainConfig[] {
  return DOMAINS.filter((d) => d.category === category);
}

export function getDomain(key: DomainKey): DomainConfig | undefined {
  return DOMAINS.find((d) => d.key === key);
}

export const ALL_DOMAIN_KEYS: DomainKey[] = DOMAINS.map((d) => d.key);
