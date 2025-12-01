import { REWARD_CONFIG } from '../constants/appConstants';

const { LOWER_THRESHOLD, UPPER_THRESHOLD, DOUBLE_POINTS_MULTIPLIER } = REWARD_CONFIG;

export const calculateRewardPoints = (amount) => {
  if (amount == null || amount <= 0) return 0;

  const wholeAmount = Math.floor(amount);
  let points = 0;

  if (wholeAmount > UPPER_THRESHOLD) {
    points += (wholeAmount - UPPER_THRESHOLD) * DOUBLE_POINTS_MULTIPLIER;
    points += UPPER_THRESHOLD - LOWER_THRESHOLD; // 1 point for each dollar between 50 and 100
  } else if (wholeAmount > LOWER_THRESHOLD) {
    points += wholeAmount - LOWER_THRESHOLD;
  }

  return points;
};

export const addRewardPointsToTransactions = (transactions) =>
  transactions.map((t) => ({
    ...t,
    rewardPoints: calculateRewardPoints(t.amount)
  }));

export const getUniqueCustomers = (transactions) => {
  const map = new Map();
  transactions.forEach((t) => {
    if (!map.has(t.customerId)) {
      map.set(t.customerId, { customerId: t.customerId, customerName: t.customerName });
    }
  });
  return Array.from(map.values());
};

export const getCustomerTransactions = (transactions, customerId) =>
  transactions.filter((t) => t.customerId === customerId);

export const groupRewardsByMonth = (transactions) => {
  const result = {};
  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!result[key]) {
      result[key] = {
        year: date.getFullYear(),
        month: date.getMonth(),
        totalPoints: 0
      };
    }
    result[key].totalPoints += t.rewardPoints || 0;
  });
  return Object.values(result);
};

export const totalRewardPoints = (transactions) =>
  transactions.reduce((sum, t) => sum + (t.rewardPoints || 0), 0);
