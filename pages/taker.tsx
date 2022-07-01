import type { NextPage } from 'next';
import styled from 'styled-components';

import { mockOptions } from '../data/mockOptions';

interface Props {
  colored?: boolean;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0.1rem;
`;

const Taker: NextPage = () => {
  const filledArray = Array(100).fill(0);

  return (
    <Container>
      <Left>
        <div className="header">
          <h4>Markets</h4>
        </div>
        <Overview>
          <SectionHeader>
            <div className="section-left">
              <div className="top">
                <h6>Expires: Today</h6>
              </div>
              <div className="bottom">
                <p>ASSET</p>
                <p>STRIKE</p>
                <p>EXPIRY</p>
              </div>
            </div>
            <ChoiceDiv>
              <div>OVER</div>
              <div>UNDER</div>
            </ChoiceDiv>
          </SectionHeader>
          {mockOptions.slice(0, 3).map((option) => {
            return (
              <MarketContainer key={option.id}>
                <div className="market">
                  <AssetDiv>
                    <p>{option.asset.toUpperCase()}</p>
                    <p className="live-price">${option.current}</p>
                  </AssetDiv>
                  <p>${option.strike}</p>
                  <p>{option.expiry}</p>
                </div>
                <ChoiceDiv colored={true}>
                  <div>{option.over}</div>
                  <div>{option.under}</div>
                </ChoiceDiv>
              </MarketContainer>
            );
          })}
          <SectionHeader>
            <div className="section-left">
              <div className="top">
                <h6>Expires: This Week</h6>
              </div>
              <div className="bottom">
                <p>ASSET</p>
                <p>STRIKE</p>
                <p>EXPIRY</p>
              </div>
            </div>
            <ChoiceDiv>
              <div>OVER</div>
              <div>UNDER</div>
            </ChoiceDiv>
          </SectionHeader>
          {mockOptions.slice(3).map((option) => {
            return (
              <MarketContainer key={option.id}>
                <div className="market">
                  <AssetDiv>
                    <p>{option.asset.toUpperCase()}</p>
                    <p className="live-price">${option.current}</p>
                  </AssetDiv>
                  <p>${option.strike}</p>
                  <p>{option.expiry}</p>
                </div>
                <ChoiceDiv colored={true}>
                  <div>{option.over}</div>
                  <div>{option.under}</div>
                </ChoiceDiv>
              </MarketContainer>
            );
          })}
        </Overview>
      </Left>
      <Right>
        {filledArray.map((_) => {
          return <p key={Math.random()}>right side</p>;
        })}
      </Right>
    </Container>
  );
};

const Left = styled.div`
  height: 92.75vh;
  overflow-y: scroll;
  color: ${({ theme }) => theme.text.secondary};

  .header {
    padding: 0.65rem 1.4rem;
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.gray[300]};
    h4 {
      font-size: ${({ theme }) => theme.typeScale.header4};
      font-weight: 500;
    }
  }
`;

const Right = styled.div`
  height: 90vh;
  overflow-y: scroll;
`;

const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  h6 {
    font-size: ${({ theme }) => theme.typeScale.smallParagraph};
    font-weight: 400;
  }

  .section-left {
    border-right: 1px solid #606060;
    padding: 0.65rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .top {
      color: ${({ theme }) => theme.colors.tertiary};
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    p {
      font-size: ${({ theme }) => theme.typeScale.smallParagraph};
    }
  }
`;

const ChoiceDiv = styled.div<Props>`
  color: ${({ colored, theme }) =>
    colored ? theme.colors.tertiary : theme.text.secondary};
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  align-items: center;

  div,
  p {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.typeScale.helperText};

    :hover {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  :hover {
    cursor: pointer;
  }
`;

const MarketContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  display: grid;
  justify-items: stretch;
  align-items: stretch; //
  grid-template-columns: 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  h6 {
    font-size: ${({ theme }) => theme.typeScale.smallParagraph};
    font-weight: 500;
  }

  .market {
    padding: 0.65rem 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: ${({ theme }) => theme.typeScale.smallParagraph};
    }
  }
`;

const Overview = styled.div``;

const AssetDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .live-price {
    font-size: 0.8rem;
  }
`;

export default Taker;