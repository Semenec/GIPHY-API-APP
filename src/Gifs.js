import React from 'react';

class Gifs extends React.Component {
  render() {

      if (this.props.preloadState === false) {
        return (
          <div>
            <ul>{this.props.images.map((img, index) =>
              <img src={img} alt="gif" key={index} className='container' />)}
            </ul>
          </div>
        );
      } else {
        return (
          <div>
            <img  className='preload' alt="preload" src='http://eldiez.com.mx/images/loading_blue.gif' />
          </div>
        );
      }
    }
}
export default Gifs;
