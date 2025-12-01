import styled from 'styled-components';

export const TableContainer = styled.div`
  margin-top: 16px;
`;

export const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const HeaderCell = styled.th`
  text-align: left;
  padding: 6px 4px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
`;

export const Row = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

export const Cell = styled.td`
  padding: 6px 4px;
  border-bottom: 1px solid #f5f5f5;
`;

export const Message = styled.p`
  font-size: 14px;
`;
