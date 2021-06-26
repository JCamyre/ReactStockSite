import React from 'react'
import styled from 'styled-components';

const StockContainer = styled.div`
  width: 100%;
  min-height: 6em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

const Ticker = styled.h2`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;


function StockElement(props) {
  const { ticker, name } = props;

    return (
        <StockContainer>
          <Ticker>{ticker}</Ticker>
          <Name>{name}</Name>            
        </StockContainer>
    );
}

export default StockElement