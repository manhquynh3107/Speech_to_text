import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  margin-bottom: 10px;
  > * {
    max-width: 100%;
    img {
      max-width: 100%;
      max-height: 70px;
    }
  }

  .first {
    display: flex;
    align-items: center;
    max-height: 100px;
  }

  .second {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #000;
    > div:nth-child(2) {
      font-size: 20px;
    }
  }

  .third {
    display: flex;
    justify-content: flex-end;
    img {
      max-width: 100%;
      max-height: 80px;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    .second {
      order: 1;
      grid-column: 1 / 3;
    }
    .first, .third {
      order: 2;
    }
  }
`;

export { TitleWrapper };
