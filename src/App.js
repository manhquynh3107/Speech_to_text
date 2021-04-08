import React from 'react';
import ReactDOM from 'react-dom';

class UserComponent extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          name: props.name
      }
  }

  render() {
      return (
          <div>Hello {this.state.name}!</div>
      );
  }
}

UserComponent.propTypes = {
  name: React.PropTypes.string,
};

UserComponent.defaultProps = {
  name: 'Hoang Hoi'
}

ReactDOM.render(<UserComponent/>, document.getElementById('app'));

