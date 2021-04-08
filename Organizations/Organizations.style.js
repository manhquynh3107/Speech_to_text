import styled from 'styled-components';

const OrganizationsWrapper = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
  }
   
  .logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
  
    > img {
      max-width: 100%;
      max-height: 180px;
    }
  }

  .logo-wrapper:first-child > img {
    width: 200px;
  }
`;

export { OrganizationsWrapper };
