import styled from 'styled-components';

const GameShowWrapper = styled.div`
  background-repeat: no-repeat;
  background-size: auto;
  background-position: center center;
  min-height: 100vh;
`;

const Calculator = styled.div`
  text-align: center;
  .btn-check {
    padding: 12px 30px;
    text-transform: uppercase;
    border-radius: 5px;
    background: green;
    font-weight: 700;
    color: #fff;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    cursor: pointer;
  }

  .score {
    margin-top: 30px;
    font-size: 50px;
  }
`;

export { GameShowWrapper, Calculator };
