import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

export class Home extends React.Component {
  render() {
    const tasksList = this.props.feedItems;
    return (
      <div className="App">
        <h1 className="App-title">Amazon Blind</h1>
        {_.map(tasksList.toJS(), (rows) =>
          <div className="row" style={{display: 'flex', width: '50%', margin: '0 auto'}}>
            <div className="typefield">
              {rows.event}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feedItems: state.feedData
  };
};

export default connect(mapStateToProps)(Home);