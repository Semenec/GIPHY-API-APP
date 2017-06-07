import React from 'react';

class LoadMore extends React.Component {

  render() {
    return (
      <div>
        <button className='loadBtn' onClick={this.props.loadMore}>Load More</button>
      </div>
    )
  }
}

export default LoadMore;
