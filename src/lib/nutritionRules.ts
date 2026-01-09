/**
 * Nutrition Tracker - Rule-Based Intelligence
 * Designed for seamless ML-based parsing integration later
 */

export type FeedType = 'breast' | 'formula' | 'solid' | 'water' | 'other';
export type StoolType = 'normal' | 'loose' | 'hard' | 'mucus';

export interface FeedingEntry {
  id: string;
  timestamp: Date;
  type: FeedType;
  quantity?: number; // ml for liquids, grams for solids
  duration?: number; // minutes for breastfeeding
  notes?: string;
}

export interface DiaperEntry {
  id: string;
  timestamp: Date;
  wet: boolean;
  stool: boolean;
  stoolType?: StoolType;
}

export interface DailyLog {
  date: string;
  feedings: FeedingEntry[];
  diapers: DiaperEntry[];
  freeTextLogs: string[];
}

export interface DailySummary {
  date: string;
  totalFeedings: number;
  totalBreastMinutes: number;
  totalFormulaMl: number;
  totalSolidGrams: number;
  wetDiapers: number;
  stoolCount: number;
  alerts: Alert[];
}

export interface Alert {
  type: 'warning' | 'info' | 'danger';
  category: 'hydration' | 'nutrition' | 'development' | 'health';
  message: string;
}

export interface NutritionTip {
  ageRange: [number, number]; 
  tip: string;
  category: 'feeding' | 'development' | 'sleep' | 'general' | 'nutrition';
}

// Age-based nutrition guidelines
const NUTRITION_GUIDELINES: Record<string, { minFeedings: number; minWetDiapers: number; solidsSafe: boolean }> = {
  '0-1': { minFeedings: 8, minWetDiapers: 6, solidsSafe: false },
  '1-3': { minFeedings: 7, minWetDiapers: 6, solidsSafe: false },
  '3-6': { minFeedings: 6, minWetDiapers: 5, solidsSafe: false },
  '6-9': { minFeedings: 5, minWetDiapers: 4, solidsSafe: true },
  '9-12': { minFeedings: 4, minWetDiapers: 4, solidsSafe: true },
  '12+': { minFeedings: 3, minWetDiapers: 4, solidsSafe: true },
};


// Nutrition tips by age
const NUTRITION_TIPS: NutritionTip[] = [
  { ageRange: [0, 1], tip: 'Feed on demand, typically 8-12 times per day. Watch for hunger cues like rooting and hand-to-mouth.', category: 'feeding' },
  { ageRange: [0, 3], tip: 'Breast milk or formula provides all nutrition needed. No water or solids yet.', category: 'feeding' },
  { ageRange: [1, 3], tip: 'Growth spurts around 2-3 weeks, 6 weeks, and 3 months may increase feeding frequency.', category: 'development' },
  { ageRange: [3, 6], tip: 'Baby may start showing interest in food, but wait until 6 months for solids.', category: 'development' },
  { ageRange: [4, 6], tip: 'Signs of readiness for solids: good head control, sitting with support, interest in food.', category: 'feeding' },
  { ageRange: [6, 8], tip: 'Start with single-ingredient purees. Introduce one new food every 3-5 days to watch for allergies.', category: 'feeding' },
  { ageRange: [6, 9], tip: 'Iron-rich foods are important now. Try iron-fortified cereals, pureed meats, or beans.', category: 'nutrition' },
  { ageRange: [8, 10], tip: 'Introduce soft finger foods as baby develops pincer grasp. Avoid choking hazards.', category: 'feeding' },
  { ageRange: [9, 12], tip: 'Baby can try most family foods in appropriate textures. Continue breast milk or formula.', category: 'feeding' },
  { ageRange: [10, 12], tip: 'Offer a sippy cup with water during meals. Limit juice.', category: 'feeding' },
  { ageRange: [12, 24], tip: 'Transition to whole milk. Aim for 16-24 oz daily. Focus on variety in solid foods.', category: 'feeding' },
];

/**
 * Get age bracket key for guidelines lookup
 */
function getAgeBracket(ageMonths: number): string {
  if (ageMonths < 1) return '0-1';
  if (ageMonths < 3) return '1-3';
  if (ageMonths < 6) return '3-6';
  if (ageMonths < 9) return '6-9';
  if (ageMonths < 12) return '9-12';
  return '12+';
}

/**
 * Get nutrition guidelines for baby's age
 */
export function getGuidelinesForAge(ageMonths: number) {
  return NUTRITION_GUIDELINES[getAgeBracket(ageMonths)];
}

/**
 * Get relevant nutrition tips for baby's age
 */
export function getTipsForAge(ageMonths: number): NutritionTip[] {
  return NUTRITION_TIPS.filter(
    tip => ageMonths >= tip.ageRange[0] && ageMonths <= tip.ageRange[1]
  );
}

/**
 * Parse free-text log entry (rule-based, ML-ready structure)
 * Example: "3am 90ml formula, 6 wet diapers, 2 poops"
 */
export function parseFreeTextLog(text: string, ageMonths: number): {
  feedings: Partial<FeedingEntry>[];
  diapers: Partial<DiaperEntry>[];
  alerts: Alert[];
  unparsed: string[];
} {
  const result: ReturnType<typeof parseFreeTextLog> = {
    feedings: [],
    diapers: [],
    alerts: [],
    unparsed: [],
  };

  const lowerText = text.toLowerCase();
  const segments = lowerText.split(/[,;]+/).map(s => s.trim()).filter(Boolean);

  for (const segment of segments) {
    let parsed = false;

    // Parse formula/bottle entries: "90ml formula", "4oz bottle"
    const formulaMatch = segment.match(/(\d+)\s*(ml|oz)\s*(formula|bottle)/i);
    if (formulaMatch) {
      const quantity = parseInt(formulaMatch[1]);
      const unit = formulaMatch[2].toLowerCase();
      result.feedings.push({
        type: 'formula',
        quantity: unit === 'oz' ? Math.round(quantity * 29.57) : quantity, // convert oz to ml
      });
      parsed = true;
    }

    // Parse breastfeeding: "breastfed 15 min", "nursed 10 minutes"
    const breastMatch = segment.match(/(breast|nurse|bf)\w*\s*(\d+)\s*(min|m)/i);
    if (breastMatch) {
      result.feedings.push({
        type: 'breast',
        duration: parseInt(breastMatch[2]),
      });
      parsed = true;
    }

    // Parse solids: "50g puree", "solids 30g"
    const solidMatch = segment.match(/(\d+)\s*g\s*(puree|solid|food|cereal)/i) ||
                       segment.match(/(puree|solid|food|cereal)\s*(\d+)\s*g/i);
    if (solidMatch) {
      const grams = parseInt(solidMatch[1]) || parseInt(solidMatch[2]);
      result.feedings.push({
        type: 'solid',
        quantity: grams,
      });
      
      // Check if solids are appropriate for age
      const guidelines = getGuidelinesForAge(ageMonths);
      if (!guidelines.solidsSafe) {
        result.alerts.push({
          type: 'warning',
          category: 'development',
          message: `Solids logged but baby is only ${ageMonths} months old. WHO recommends waiting until 6 months.`,
        });
      }
      parsed = true;
    }

    // Parse wet diapers: "6 wet diapers", "5 wet"
    const wetMatch = segment.match(/(\d+)\s*wet\s*(diaper)?s?/i);
    if (wetMatch) {
      const count = parseInt(wetMatch[1]);
      for (let i = 0; i < count; i++) {
        result.diapers.push({ wet: true, stool: false });
      }
      parsed = true;
    }

    // Parse stool/poop: "2 poops", "1 dirty diaper"
    const stoolMatch = segment.match(/(\d+)\s*(poop|stool|dirty|bm)s?\s*(diaper)?s?/i);
    if (stoolMatch) {
      const count = parseInt(stoolMatch[1]);
      for (let i = 0; i < count; i++) {
        result.diapers.push({ wet: false, stool: true });
      }
      parsed = true;
    }

    if (!parsed && segment.length > 2) {
      result.unparsed.push(segment);
    }
  }

  return result;
}


/**
 * Generate daily summary with alerts
 */
export function generateDailySummary(log: DailyLog, ageMonths: number): DailySummary {
  const summary: DailySummary = {
    date: log.date,
    totalFeedings: log.feedings.length,
    totalBreastMinutes: 0,
    totalFormulaMl: 0,
    totalSolidGrams: 0,
    wetDiapers: 0,
    stoolCount: 0,
    alerts: [],
  };

  // Aggregate feedings
  for (const feeding of log.feedings) {
    if (feeding.type === 'breast' && feeding.duration) {
      summary.totalBreastMinutes += feeding.duration;
    } else if (feeding.type === 'formula' && feeding.quantity) {
      summary.totalFormulaMl += feeding.quantity;
    } else if (feeding.type === 'solid' && feeding.quantity) {
      summary.totalSolidGrams += feeding.quantity;
    }
  }

  // Aggregate diapers
  for (const diaper of log.diapers) {
    if (diaper.wet) summary.wetDiapers++;
    if (diaper.stool) summary.stoolCount++;
  }

  // Generate alerts based on guidelines
  const guidelines = getGuidelinesForAge(ageMonths);

  // Hydration warning
  if (summary.wetDiapers < guidelines.minWetDiapers) {
    summary.alerts.push({
      type: 'warning',
      category: 'hydration',
      message: `Only ${summary.wetDiapers} wet diapers today. Expected at least ${guidelines.minWetDiapers} for this age. Ensure adequate feeding.`,
    });
  }

  // Feeding frequency warning
  if (summary.totalFeedings < guidelines.minFeedings) {
    summary.alerts.push({
      type: 'info',
      category: 'nutrition',
      message: `${summary.totalFeedings} feedings logged. Babies this age typically need ${guidelines.minFeedings}+ feedings daily.`,
    });
  }

  // Solids before 6 months warning
  if (summary.totalSolidGrams > 0 && !guidelines.solidsSafe) {
    summary.alerts.push({
      type: 'danger',
      category: 'development',
      message: 'Solids introduced before 6 months. Consult your pediatrician about readiness signs.',
    });
  }

  // No stool warning (age-dependent)
  if (ageMonths < 2 && summary.stoolCount === 0) {
    summary.alerts.push({
      type: 'info',
      category: 'health',
      message: 'No stool logged today. Newborns typically have multiple bowel movements daily.',
    });
  }

  // Low formula intake warning
  if (ageMonths < 6 && summary.totalFormulaMl > 0) {
    const expectedMl = Math.min(150 * (ageMonths + 3), 900); // rough guideline
    if (summary.totalFormulaMl < expectedMl * 0.7) {
      summary.alerts.push({
        type: 'warning',
        category: 'nutrition',
        message: `Formula intake (${summary.totalFormulaMl}ml) seems low. Expected around ${expectedMl}ml for this age.`,
      });
    }
  }

  return summary;
}

/**
 * Check for concerning patterns across multiple days
 */
export function analyzeWeeklyTrends(
  summaries: DailySummary[],
  ageMonths: number
): Alert[] {
  const alerts: Alert[] = [];
  
  if (summaries.length < 3) return alerts;

  const recentSummaries = summaries.slice(-7);
  
  // Check for consistent low wet diapers
  const avgWetDiapers = recentSummaries.reduce((sum, s) => sum + s.wetDiapers, 0) / recentSummaries.length;
  const guidelines = getGuidelinesForAge(ageMonths);
  
  if (avgWetDiapers < guidelines.minWetDiapers * 0.8) {
    alerts.push({
      type: 'warning',
      category: 'hydration',
      message: `Average wet diapers (${avgWetDiapers.toFixed(1)}/day) is below expected. Monitor hydration closely.`,
    });
  }

  // Check for declining feeding frequency
  if (recentSummaries.length >= 5) {
    const firstHalf = recentSummaries.slice(0, Math.floor(recentSummaries.length / 2));
    const secondHalf = recentSummaries.slice(Math.floor(recentSummaries.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, s) => sum + s.totalFeedings, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, s) => sum + s.totalFeedings, 0) / secondHalf.length;
    
    if (secondAvg < firstAvg * 0.7) {
      alerts.push({
        type: 'info',
        category: 'nutrition',
        message: 'Feeding frequency has decreased recently. This may be normal, but monitor weight gain.',
      });
    }
  }

  return alerts;
}

/**
 * Create a structured feeding entry
 */
export function createFeedingEntry(
  type: FeedType,
  options: { quantity?: number; duration?: number; notes?: string } = {}
): FeedingEntry {
  return {
    id: generateId(),
    timestamp: new Date(),
    type,
    ...options,
  };
}

/**
 * Create a structured diaper entry
 */
export function createDiaperEntry(
  wet: boolean,
  stool: boolean,
  stoolType?: StoolType
): DiaperEntry {
  return {
    id: generateId(),
    timestamp: new Date(),
    wet,
    stool,
    stoolType,
  };
}

/**
 * Generate simple unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Format summary for display
 */
export function formatSummaryText(summary: DailySummary): string {
  const lines: string[] = [`📅 Daily Summary for ${summary.date}`];
  
  lines.push('');
  lines.push('🍼 Feeding:');
  lines.push(`   Total feedings: ${summary.totalFeedings}`);
  if (summary.totalBreastMinutes > 0) {
    lines.push(`   Breastfeeding: ${summary.totalBreastMinutes} minutes`);
  }
  if (summary.totalFormulaMl > 0) {
    lines.push(`   Formula: ${summary.totalFormulaMl} ml`);
  }
  if (summary.totalSolidGrams > 0) {
    lines.push(`   Solids: ${summary.totalSolidGrams} g`);
  }
  
  lines.push('');
  lines.push('🧷 Diapers:');
  lines.push(`   Wet: ${summary.wetDiapers}`);
  lines.push(`   Stool: ${summary.stoolCount}`);
  
  if (summary.alerts.length > 0) {
    lines.push('');
    lines.push('⚠️ Alerts:');
    for (const alert of summary.alerts) {
      const icon = alert.type === 'danger' ? '🔴' : alert.type === 'warning' ? '🟡' : 'ℹ️';
      lines.push(`   ${icon} ${alert.message}`);
    }
  }
  
  return lines.join('\n');
}
