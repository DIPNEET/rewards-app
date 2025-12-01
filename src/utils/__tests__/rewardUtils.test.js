import { calculateRewardPoints } from '../rewardUtils';

describe('calculateRewardPoints', () => {
  test('returns 0 points for $50', () => {
    expect(calculateRewardPoints(50)).toBe(0);
  });

  test('returns points for amount between 50 and 100', () => {
    expect(calculateRewardPoints(75)).toBe(25);
  });

  test('returns correct points for amount over 100', () => {
    expect(calculateRewardPoints(120)).toBe(90);
  });

  test('returns 0 for amount less than 50', () => {
    expect(calculateRewardPoints(49)).toBe(0);
  });

  test('returns 0 for non-positive amount', () => {
    expect(calculateRewardPoints(0)).toBe(0);
    expect(calculateRewardPoints(-10)).toBe(0);
  });

  test('ignores fractional part', () => {
    expect(calculateRewardPoints(120.75)).toBe(90);
  });
});
