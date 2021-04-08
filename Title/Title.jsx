import React from 'react';
import { TitleWrapper } from './Title.style';

class Title extends React.Component {
  render() {
    return (
      <TitleWrapper>
        <div className="first">
          <img src="https://media.vbee.vn/images/2018/12/06/l2epKs3BGPjZ6Lng.png" />
        </div>
        <div className="second">
          <div>Who let the words out</div>
          <div>Vbee Group, SoICT, HUST</div>
        </div>
        <div className="third">
          <img src="https://media.vbee.vn/images/2018/12/06/pjPuZ3bn1pIvLYbC.png" />
          &nbsp;
          <img src="https://media.vbee.vn/images/2018/12/06/4RxH61xayjZGVkYC.png" />
        </div>
      </TitleWrapper>
    );
  }
}

export default Title;

