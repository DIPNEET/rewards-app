import logger from '../logger';

const DATA_URL = `${process.env.PUBLIC_URL}/data/transactions.json`;

export const fetchTransactions = () =>
  new Promise((resolve, reject) => {
    logger.info({ event: 'FETCH_TRANSACTIONS_START' }, 'Fetching transactions');

    setTimeout(async () => {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          logger.error({ status: response.status }, 'Failed to fetch transactions');
          reject(new Error('Failed to fetch transactions'));
          return;
        }
        const data = await response.json();
        logger.info({ count: data.length }, 'Fetched transactions successfully');
        resolve(data);
      } catch (error) {
        logger.error({ error }, 'Error fetching transactions');
        reject(error);
      }
    }, 700);
  });
