import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { fetchTransactions } from './api/transactionsApi';
import {
  addRewardPointsToTransactions,
  getUniqueCustomers,
  getCustomerTransactions,
  totalRewardPoints
} from './utils/rewardUtils';
import { filterByMonthYear } from './utils/dateUtils';
import CustomerList from './components/CustomerList/CustomerList';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';
import FiltersBar from './components/FiltersBar/FiltersBar';
import { DEFAULT_YEAR } from './constants/appConstants';
import logger from './logger';

const AppContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
  font-family: Arial, sans-serif;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 2fr;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('LAST_3');
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    logger.info('App mounted');
    setLoading(true);
    fetchTransactions()
      .then((data) => {
        const withRewards = addRewardPointsToTransactions(data);
        setTransactions(withRewards);
        const uniqueCustomers = getUniqueCustomers(withRewards);
        setCustomers(uniqueCustomers);
        if (uniqueCustomers.length) {
          setSelectedCustomerId(uniqueCustomers[0].customerId);
        }
      })
      .catch((err) => {
        logger.error({ error: err }, 'Failed to load transactions');
        setError('Failed to load transactions');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredByCustomerAndFilter = useMemo(() => {
    if (!selectedCustomerId) return [];
    const customerTransactions = getCustomerTransactions(
      transactions,
      selectedCustomerId
    );
    return filterByMonthYear(customerTransactions, selectedMonth, selectedYear);
  }, [transactions, selectedCustomerId, selectedMonth, selectedYear]);

  const customerTotalPointsMap = useMemo(() => {
    const map = {};
    customers.forEach((c) => {
      const customerTx = getCustomerTransactions(transactions, c.customerId);
      const tx = filterByMonthYear(customerTx, selectedMonth, selectedYear);
      map[c.customerId] = totalRewardPoints(tx);
    });
    return map;
  }, [customers, transactions, selectedMonth, selectedYear]);

  const selectedCustomer = useMemo(
    () => customers.find((c) => c.customerId === selectedCustomerId) || null,
    [customers, selectedCustomerId]
  );

  if (loading) {
    return (
      <AppContainer>
        <h1>Customer Rewards</h1>
        <p>Loading transactions...</p>
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer>
        <h1>Customer Rewards</h1>
        <p>{error}</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <h1>Customer Rewards</h1>
      <FiltersBar
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />
      <Layout>
        <CustomerList
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onSelectCustomer={setSelectedCustomerId}
          customerTotalPointsMap={customerTotalPointsMap}
        />
        <CustomerDetails
          customer={selectedCustomer}
          transactions={getCustomerTransactions(
            transactions,
            selectedCustomerId
          )}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </Layout>
    </AppContainer>
  );
};

export default App;
