import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  background-color: #fff;
`;

export const Header = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
`;

export const SummaryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 14px;
`;

export const SummaryItem = styled.div``;

export const SubTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
`;

export const MonthTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin-bottom: 12px;
`;

export const MonthHeaderCell = styled.th`
  text-align: left;
  padding: 6px 4px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
`;

export const MonthRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

export const MonthCell = styled.td`
  padding: 6px 4px;
  border-bottom: 1px solid #f5f5f5;
`;
