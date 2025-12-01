import styled from 'styled-components';

export const CustomerListContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  background-color: #fff;
`;

export const CustomerListTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
`;

export const CustomerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const CustomerHeaderCell = styled.th`
  text-align: left;
  padding: 6px 4px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
`;

export const CustomerRow = styled.tr`
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? '#eef5ff' : 'transparent')};

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const CustomerCell = styled.td`
  padding: 6px 4px;
  border-bottom: 1px solid #f4f4f4;
`;

export const PaginationWrapper = styled.div`
  margin-top: 8px;
`;
