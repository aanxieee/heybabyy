
const WHO_LMS_BOYS_WEIGHT: Record<number, { L: number; M: number; S: number }> = {
  0: { L: 0.3487, M: 3.3464, S: 0.14602 },
  1: { L: 0.2297, M: 4.4709, S: 0.13395 },
  2: { L: 0.197, M: 5.5675, S: 0.12385 },
  3: { L: 0.1738, M: 6.3762, S: 0.11727 },
  4: { L: 0.1553, M: 7.0023, S: 0.11316 },
  5: { L: 0.1395, M: 7.5105, S: 0.1108 },
  6: { L: 0.1257, M: 7.934, S: 0.10958 },
  7: { L: 0.1134, M: 8.297, S: 0.10902 },
  8: { L: 0.1021, M: 8.6151, S: 0.10882 },
  9: { L: 0.0917, M: 8.9014, S: 0.10881 },
  10: { L: 0.082, M: 9.1649, S: 0.10891 },
  11: { L: 0.073, M: 9.4122, S: 0.10906 },
  12: { L: 0.0644, M: 9.6479, S: 0.10925 },
  18: { L: 0.0271, M: 10.9, S: 0.11 },
  24: { L: -0.005, M: 12.2, S: 0.112 },
};

const WHO_LMS_GIRLS_WEIGHT: Record<number, { L: number; M: number; S: number }> = {
  0: { L: 0.3809, M: 3.2322, S: 0.14171 },
  1: { L: 0.1714, M: 4.1873, S: 0.13724 },
  2: { L: 0.0962, M: 5.1282, S: 0.12619 },
  3: { L: 0.0402, M: 5.8458, S: 0.11872 },
  4: { L: -0.005, M: 6.4237, S: 0.11342 },
  5: { L: -0.043, M: 6.8985, S: 0.10973 },
  6: { L: -0.0756, M: 7.297, S: 0.10717 },
  7: { L: -0.1039, M: 7.6422, S: 0.10531 },
  8: { L: -0.1288, M: 7.9487, S: 0.10393 },
  9: { L: -0.1507, M: 8.2254, S: 0.10287 },
  10: { L: -0.17, M: 8.48, S: 0.10203 },
  11: { L: -0.187, M: 8.7167, S: 0.10134 },
  12: { L: -0.202, M: 8.9396, S: 0.10076 },
  18: { L: -0.27, M: 10.2, S: 0.102 },
  24: { L: -0.32, M: 11.5, S: 0.105 },
};


const WHO_LMS_BOYS_LENGTH: Record<number, { L: number; M: number; S: number }> = {
  0: { L: 1, M: 49.9, S: 0.03795 },
  1: { L: 1, M: 54.7, S: 0.03557 },
  2: { L: 1, M: 58.4, S: 0.03424 },
  3: { L: 1, M: 61.4, S: 0.03328 },
  4: { L: 1, M: 63.9, S: 0.03257 },
  5: { L: 1, M: 65.9, S: 0.03204 },
  6: { L: 1, M: 67.6, S: 0.03165 },
  7: { L: 1, M: 69.2, S: 0.03139 },
  8: { L: 1, M: 70.6, S: 0.03124 },
  9: { L: 1, M: 72.0, S: 0.03117 },
  10: { L: 1, M: 73.3, S: 0.03118 },
  11: { L: 1, M: 74.5, S: 0.03125 },
  12: { L: 1, M: 75.7, S: 0.03137 },
  18: { L: 1, M: 82.3, S: 0.032 },
  24: { L: 1, M: 87.8, S: 0.033 },
};

const WHO_LMS_GIRLS_LENGTH: Record<number, { L: number; M: number; S: number }> = {
  0: { L: 1, M: 49.1, S: 0.0379 },
  1: { L: 1, M: 53.7, S: 0.03614 },
  2: { L: 1, M: 57.1, S: 0.03508 },
  3: { L: 1, M: 59.8, S: 0.03428 },
  4: { L: 1, M: 62.1, S: 0.03362 },
  5: { L: 1, M: 64.0, S: 0.03309 },
  6: { L: 1, M: 65.7, S: 0.03264 },
  7: { L: 1, M: 67.3, S: 0.03228 },
  8: { L: 1, M: 68.7, S: 0.03199 },
  9: { L: 1, M: 70.1, S: 0.03177 },
  10: { L: 1, M: 71.5, S: 0.03162 },
  11: { L: 1, M: 72.8, S: 0.03154 },
  12: { L: 1, M: 74.0, S: 0.03153 },
  18: { L: 1, M: 80.7, S: 0.032 },
  24: { L: 1, M: 86.4, S: 0.033 },
};

export type Gender = 'boy' | 'girl';
export type MeasurementType = 'weight' | 'length';

interface LMSParams {
  L: number;
  M: number;
  S: number;
}
function getLMSParams(
  gender: Gender,
  ageMonths: number,
  type: MeasurementType
): LMSParams {
  const dataset = type === 'weight'
    ? (gender === 'boy' ? WHO_LMS_BOYS_WEIGHT : WHO_LMS_GIRLS_WEIGHT)
    : (gender === 'boy' ? WHO_LMS_BOYS_LENGTH : WHO_LMS_GIRLS_LENGTH);

  const ages = Object.keys(dataset).map(Number).sort((a, b) => a - b);
  
 
  if (dataset[ageMonths]) {
    return dataset[ageMonths];
  }

 
  let lowerAge = ages[0];
  let upperAge = ages[ages.length - 1];

  for (let i = 0; i < ages.length - 1; i++) {
    if (ages[i] <= ageMonths && ages[i + 1] >= ageMonths) {
      lowerAge = ages[i];
      upperAge = ages[i + 1];
      break;
    }
  }

  // Clamp to available range
  if (ageMonths < ages[0]) return dataset[ages[0]];
  if (ageMonths > ages[ages.length - 1]) return dataset[ages[ages.length - 1]];

  // Linear interpolation
  const ratio = (ageMonths - lowerAge) / (upperAge - lowerAge);
  const lower = dataset[lowerAge];
  const upper = dataset[upperAge];

  return {
    L: lower.L + ratio * (upper.L - lower.L),
    M: lower.M + ratio * (upper.M - lower.M),
    S: lower.S + ratio * (upper.S - lower.S),
  };
}


export function calculateZScore(
  gender: Gender,
  ageMonths: number,
  value: number,
  type: MeasurementType
): number {
  const { L, M, S } = getLMSParams(gender, ageMonths, type);

  if (Math.abs(L) < 0.001) {
    return Math.log(value / M) / S;
  }

  return (Math.pow(value / M, L) - 1) / (L * S);
}


export function zScoreToPercentile(zScore: number): number {

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = zScore < 0 ? -1 : 1;
  const z = Math.abs(zScore) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * z);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

  return Math.round((0.5 * (1.0 + sign * y)) * 100);
}

export interface GrowthAnalysis {
  zScore: number;
  percentile: number;
  lengthZScore?: number;
  lengthPercentile?: number;
  status: 'normal' | 'monitor' | 'concern';
  message: string;
  color: string;
}


export function analyzeGrowth(
  gender: Gender,
  ageMonths: number,
  weight: number,
  length?: number
): GrowthAnalysis {
  const weightZ = calculateZScore(gender, ageMonths, weight, 'weight');
  
  
  const lengthZ = length 
    ? calculateZScore(gender, ageMonths, length, 'length')
    : undefined;
  const percentile = zScoreToPercentile(weightZ);

  let status: GrowthAnalysis['status'] = 'normal';
  let message = '';
  let color = 'text-green-600';

  if (weightZ < -3) {
    status = 'concern';
    message = 'Severely underweight. Please consult your pediatrician immediately.';
    color = 'text-red-600';
  } else if (weightZ < -2) {
    status = 'concern';
    message = 'Underweight. Schedule a check-up with your pediatrician.';
    color = 'text-orange-600';
  } else if (weightZ < -1) {
    status = 'monitor';
    message = 'Slightly below average. Monitor closely and ensure adequate nutrition.';
    color = 'text-yellow-600';
  } else if (weightZ <= 1) {
    status = 'normal';
    message = 'Healthy weight range! Keep up the good work.';
    color = 'text-green-600';
  } else if (weightZ <= 2) {
    status = 'monitor';
    message = 'Above average weight. Monitor feeding patterns.';
    color = 'text-yellow-600';
  } else if (weightZ <= 3) {
    status = 'concern';
    message = 'Overweight. Consider consulting your pediatrician.';
    color = 'text-orange-600';
  } else {
    status = 'concern';
    message = 'Significantly overweight. Please consult your pediatrician.';
    color = 'text-red-600';
  }

  return {
    zScore: Math.round(weightZ * 100) / 100,
    percentile,
    lengthZScore: lengthZ ? Math.round(lengthZ * 100) / 100 : undefined,
    lengthPercentile: lengthZ ? zScoreToPercentile(lengthZ) : undefined,
    status,
    message,
    color,
  };
}


export function detectGrowthDrift(
  measurements: Array<{ month: number; weight: number }>,
  gender: Gender
): { hasDrift: boolean; message: string; severity: 'none' | 'mild' | 'moderate' | 'severe' } {
  if (measurements.length < 2) {
    return { hasDrift: false, message: '', severity: 'none' };
  }

  const sorted = [...measurements].sort((a, b) => a.month - b.month);
  const zScores = sorted.map(m => calculateZScore(gender, m.month, m.weight, 'weight'));

  
  const recentChange = zScores.length >= 2 
    ? zScores[zScores.length - 1] - zScores[zScores.length - 2]
    : 0;

  const totalChange = zScores[zScores.length - 1] - zScores[0];

  if (Math.abs(recentChange) > 1.5 || Math.abs(totalChange) > 2) {
    return {
      hasDrift: true,
      message: recentChange < 0 
        ? 'Significant weight loss detected. Please consult your pediatrician.'
        : 'Rapid weight gain detected. Monitor feeding patterns.',
      severity: Math.abs(recentChange) > 2 ? 'severe' : 'moderate',
    };
  }

  if (Math.abs(recentChange) > 0.75) {
    return {
      hasDrift: true,
      message: recentChange < 0
        ? 'Weight gain has slowed. Ensure adequate nutrition.'
        : 'Weight gain is accelerating. Monitor portion sizes.',
      severity: 'mild',
    };
  }

  return { hasDrift: false, message: '', severity: 'none' };
}


export function getPercentileLines(
  gender: Gender,
  type: MeasurementType,
  maxMonth: number = 12
): Array<{ percentile: number; data: Array<{ month: number; value: number }> }> {
  const percentiles = [3, 15, 50, 85, 97];
  const zScores = [-1.88, -1.04, 0, 1.04, 1.88]; 
  return percentiles.map((p, idx) => ({
    percentile: p,
    data: Array.from({ length: maxMonth + 1 }, (_, month) => {
      const { L, M, S } = getLMSParams(gender, month, type);
      const z = zScores[idx];
      const value = L !== 0
        ? M * Math.pow(1 + L * S * z, 1 / L)
        : M * Math.exp(S * z);
      return { month, value: Math.round(value * 100) / 100 };
    }),
  }));
}


/**
 * Generate sparkline data for recent growth trends
 * Returns normalized values (0-1) for visual display
 */
export function generateGrowthSparkline(
  measurements: Array<{ month: number; weight: number }>,
  gender: Gender
): { points: number[]; trend: 'up' | 'down' | 'stable'; zScores: number[] } {
  if (measurements.length === 0) {
    return { points: [], trend: 'stable', zScores: [] };
  }

  const sorted = [...measurements].sort((a, b) => a.month - b.month);
  const zScores = sorted.map(m => calculateZScore(gender, m.month, m.weight, 'weight'));

  // Normalize Z-scores to 0-1 range for sparkline display
  // Map Z-score range [-3, 3] to [0, 1]
  const points = zScores.map(z => Math.max(0, Math.min(1, (z + 3) / 6)));

  // Determine trend from recent measurements
  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (zScores.length >= 2) {
    const recentChange = zScores[zScores.length - 1] - zScores[zScores.length - 2];
    if (recentChange > 0.3) trend = 'up';
    else if (recentChange < -0.3) trend = 'down';
  }

  return { points, trend, zScores: zScores.map(z => Math.round(z * 100) / 100) };
}

/**
 * Get sparkline as ASCII art for text display
 */
export function sparklineToAscii(points: number[]): string {
  const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  return points.map(p => chars[Math.min(7, Math.floor(p * 8))]).join('');
}
