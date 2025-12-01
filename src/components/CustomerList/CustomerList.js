import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CustomerListContainer,
  CustomerListTitle,
  CustomerTable,
  CustomerHeaderCell,
  CustomerRow,
  CustomerCell,
  PaginationWrapper
} from './CustomerList.styles';
import Pagination from '../Pagination/Pagination';
import { CUSTOMERS_PER_PAGE } from '../../constants/appConstants';

const CustomerList = ({
  customers,
  selectedCustomerId,
  onSelectCustomer,
  customerTotalPointsMap
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedCustomers, totalPages } = useMemo(() => {
    const totalPagesCalc = Math.ceil(customers.length / CUSTOMERS_PER_PAGE) || 1;
    const start = (currentPage - 1) * CUSTOMERS_PER_PAGE;
    const end = start + CUSTOMERS_PER_PAGE;
    return {
      totalPages: totalPagesCalc,
      paginatedCustomers: customers.slice(start, end)
    };
  }, [customers, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <CustomerListContainer>
      <CustomerListTitle>Customers</CustomerListTitle>
      <CustomerTable>
        <thead>
          <tr>
            <CustomerHeaderCell>Customer Id</CustomerHeaderCell>
            <CustomerHeaderCell>Customer Name</CustomerHeaderCell>
            <CustomerHeaderCell>Total Points (Filter)</CustomerHeaderCell>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((c) => (
            <CustomerRow
              key={c.customerId}
              $selected={c.customerId === selectedCustomerId}
              onClick={() => onSelectCustomer(c.customerId)}
            >
              <CustomerCell>{c.customerId}</CustomerCell>
              <CustomerCell>{c.customerName}</CustomerCell>
              <CustomerCell>{customerTotalPointsMap[c.customerId] || 0}</CustomerCell>
            </CustomerRow>
          ))}
        </tbody>
      </CustomerTable>
      <PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </PaginationWrapper>
    </CustomerListContainer>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string
    })
  ).isRequired,
  selectedCustomerId: PropTypes.string,
  onSelectCustomer: PropTypes.func.isRequired,
  customerTotalPointsMap: PropTypes.objectOf(PropTypes.number).isRequired
};

CustomerList.defaultProps = {
  selectedCustomerId: null
};

export default CustomerList;
