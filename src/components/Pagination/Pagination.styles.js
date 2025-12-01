import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;

export const PageButton = styled.button`
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  font-size: 12px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const PageInfo = styled.span`
  font-size: 12px;
`;
