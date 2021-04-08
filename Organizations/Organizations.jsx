import React from 'react';
import { OrganizationsWrapper } from './Organizations.style';

const logos = [
  { org: 'vbee', img: 'https://media.vbee.vn/images/2018/12/06/l2epKs3BGPjZ6Lng.png' },
  { org: 'soict', img: 'https://media.vbee.vn/images/2018/12/06/pjPuZ3bn1pIvLYbC.png' },
  { org: 'hust', img: 'https://media.vbee.vn/images/2018/12/06/4RxH61xayjZGVkYC.png'},
];

export default class Organizations extends React.PureComponent {
  render() {
    return (
      <OrganizationsWrapper>
        {logos.map(logo => <div className="logo-wrapper"><img src={logo.img} /></div>)}
      </OrganizationsWrapper>
    );
  }
}