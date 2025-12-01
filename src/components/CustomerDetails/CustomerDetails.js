import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  SummaryRow,
  SummaryItem,
  MonthTable,
  MonthHeaderCell,
  MonthRow,
  MonthCell,
  SubTitle
} from './CustomerDetails.styles';
import TransactionTable from '../TransactionTable/TransactionTable';
import { groupRewardsByMonth, totalRewardPoints } from '../../utils/rewardUtils';
import { MONTHS, NO_TRANSACTIONS_MESSAGE } from '../../constants/appConstants';
import { filterByMonthYear } from '../../utils/dateUtils';

const CustomerDetails = ({
  customer,
  transactions,
  selectedMonth,
  selectedYear
}) => {
  const filteredTransactions = useMemo(
    () => filterByMonthYear(transactions, selectedMonth, selectedYear),
    [transactions, selectedMonth, selectedYear]
  );

  const monthlyRewards = useMemo(
    () => groupRewardsByMonth(filteredTransactions),
    [filteredTransactions]
  );

  const totalPoints = useMemo(
    () => totalRewardPoints(filteredTransactions),
    [filteredTransactions]
  );

  const selectedMonthLabel =
    selectedMonth === 'LAST_3'
      ? 'Last 3 Months'
      : MONTHS.find((m) => m.value === selectedMonth)?.label;

  if (!customer) {
    return (
      <Container>
        <Header>Select a customer to view details</Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        Reward Summary - {customer.customerName} ({customer.customerId})
      </Header>

      <SummaryRow>
        <SummaryItem>
          <strong>Filter:</strong> {selectedMonthLabel}, {selectedYear}
        </SummaryItem>
        <SummaryItem>
          <strong>Total Reward Points:</strong> {totalPoints}
        </SummaryItem>
      </SummaryRow>

      <SubTitle>Reward points per month</SubTitle>
      {monthlyRewards.length ? (
        <MonthTable>
          <thead>
            <tr>
              <MonthHeaderCell>Month</MonthHeaderCell>
              <MonthHeaderCell>Year</MonthHeaderCell>
              <MonthHeaderCell>Reward Points</MonthHeaderCell>
            </tr>
          </thead>
          <tbody>
            {monthlyRewards.map((m) => (
              <MonthRow key={`${m.year}-${m.month}`}>
                <MonthCell>
                  {MONTHS.find((mm) => mm.value === m.month)?.label}
                </MonthCell>
                <MonthCell>{m.year}</MonthCell>
                <MonthCell>{m.totalPoints}</MonthCell>
              </MonthRow>
            ))}
          </tbody>
        </MonthTable>
      ) : (
        <p>{NO_TRANSACTIONS_MESSAGE}</p>
      )}

      <TransactionTable
        title={`Transactions - ${selectedMonthLabel}, ${selectedYear}`}
        transactions={filteredTransactions}
      />
    </Container>
  );
};

CustomerDetails.propTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string
  }),
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired
    })
  ).isRequired,
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  selectedYear: PropTypes.number.isRequired
};

CustomerDetails.defaultProps = {
  customer: null
};

export default CustomerDetails;
