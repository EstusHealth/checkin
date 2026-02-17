-- Weekly check-in scores
CREATE TABLE check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start DATE NOT NULL UNIQUE,

  -- Foundational
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 10),
  sleep_quantity INTEGER CHECK (sleep_quantity BETWEEN 1 AND 10),
  movement INTEGER CHECK (movement BETWEEN 1 AND 10),
  nutrition INTEGER CHECK (nutrition BETWEEN 1 AND 10),
  hydration INTEGER CHECK (hydration BETWEEN 1 AND 10),

  -- Cognitive / Occupational
  deep_work INTEGER CHECK (deep_work BETWEEN 1 AND 10),
  executive_function INTEGER CHECK (executive_function BETWEEN 1 AND 10),
  cognitive_load INTEGER CHECK (cognitive_load BETWEEN 1 AND 10),
  creative_output INTEGER CHECK (creative_output BETWEEN 1 AND 10),

  -- Relational
  social_connection INTEGER CHECK (social_connection BETWEEN 1 AND 10),
  intimate_relationship INTEGER CHECK (intimate_relationship BETWEEN 1 AND 10),
  professional_relationships INTEGER CHECK (professional_relationships BETWEEN 1 AND 10),

  -- Regulatory
  emotional_regulation INTEGER CHECK (emotional_regulation BETWEEN 1 AND 10),
  sensory_load INTEGER CHECK (sensory_load BETWEEN 1 AND 10),
  stimulation_seeking INTEGER CHECK (stimulation_seeking BETWEEN 1 AND 10),
  avoidance_patterns INTEGER CHECK (avoidance_patterns BETWEEN 1 AND 10),

  -- Screen / Gaming
  gaming_recovery_vs_avoidance INTEGER CHECK (gaming_recovery_vs_avoidance BETWEEN 1 AND 10),
  screen_time_quality INTEGER CHECK (screen_time_quality BETWEEN 1 AND 10),

  -- Overall
  overall_wellbeing INTEGER CHECK (overall_wellbeing BETWEEN 1 AND 10),

  -- Context
  life_events TEXT,
  barriers TEXT,
  notes TEXT,
  gaming_notes TEXT,
  week_type TEXT CHECK (week_type IN ('normal', 'high_load', 'recovery', 'transition', 'crisis')),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Protocol library
CREATE TABLE protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  target_domains TEXT[] NOT NULL,
  steps TEXT,
  expected_recovery_weeks INTEGER DEFAULT 3,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Protocol trigger rules
CREATE TABLE trigger_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id UUID REFERENCES protocols(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  operator TEXT NOT NULL CHECK (operator IN ('<', '>', '<=', '>=')),
  threshold INTEGER NOT NULL,
  consecutive_weeks INTEGER DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Protocol deployments
CREATE TABLE protocol_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id UUID REFERENCES protocols(id) ON DELETE CASCADE,
  activated_at DATE NOT NULL,
  target_domain_scores_at_start JSONB,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  adherence_rating INTEGER CHECK (adherence_rating BETWEEN 1 AND 10),
  outcome_notes TEXT,
  completed_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Life events (for timeline markers)
CREATE TABLE life_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  impact_domains TEXT[],
  severity TEXT CHECK (severity IN ('minor', 'moderate', 'major')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_check_ins_week ON check_ins(week_start DESC);
CREATE INDEX idx_deployments_status ON protocol_deployments(status);
CREATE INDEX idx_deployments_protocol ON protocol_deployments(protocol_id);
CREATE INDEX idx_trigger_rules_protocol ON trigger_rules(protocol_id);
CREATE INDEX idx_life_events_date ON life_events(event_date DESC);
