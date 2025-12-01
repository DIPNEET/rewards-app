import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Title,
  Table,
  HeaderCell,
  Row,
  Cell,
  Message
} from './TransactionTable.styles';

const TransactionTable = ({ transactions, title }) => {
  if (!transactions.length) {
    return (
      <TableContainer>
        <Title>{title}</Title>
        <Message>No transactions</Message>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Title>{title}</Title>
      <Table>
        <thead>
          <tr>
            <HeaderCell>Date</HeaderCell>
            <HeaderCell>Transaction Id</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Reward Points</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <Row key={t.transactionId}>
              <Cell>{new Date(t.date).toLocaleDateString()}</Cell>
              <Cell>{t.transactionId}</Cell>
              <Cell>{t.amount}</Cell>
              <Cell>{t.rewardPoints}</Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired
    })
  ).isRequired,
  title: PropTypes.string
};

TransactionTable.defaultProps = {
  title: 'Transactions'
};

export default TransactionTable;
