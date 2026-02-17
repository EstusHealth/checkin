import type { CheckIn, TriggerRule } from '../types';

export interface EvaluationResult {
  protocol_id: string;
  protocol_name: string;
  triggered: boolean;
  triggering_rules: TriggerRule[];
  current_values: Record<string, number[]>;
}

/**
 * Evaluate trigger rules against recent check-in data.
 * Returns true if ALL rules are satisfied (AND logic).
 */
export function evaluateTriggers(
  rules: TriggerRule[],
  checkIns: CheckIn[],
): boolean {
  return rules.every((rule) => {
    const recentScores = checkIns
      .slice(0, rule.consecutive_weeks)
      .map((ci) => ci[rule.domain as keyof CheckIn] as number)
      .filter((v): v is number => v !== null);

    if (recentScores.length < rule.consecutive_weeks) return false;

    return recentScores.every((score) => {
      switch (rule.operator) {
        case '<':
          return score < rule.threshold;
        case '>':
          return score > rule.threshold;
        case '<=':
          return score <= rule.threshold;
        case '>=':
          return score >= rule.threshold;
      }
    });
  });
}
