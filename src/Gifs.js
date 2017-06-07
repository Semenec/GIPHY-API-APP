import React from 'react';


class Gifs extends React.Component {
  render() {
    return (
      if (this.state.preload === false) {
        return (
          <div>
            <input className='inputSearch' onChange={this.handleChange} type="text" />
            <button className='searchBtn' onClick={this.searchBtn}>Search</button>
            <ul>{this.state.images.map((img, index) =>
              <img src={img} key={index} className='container' />)}
            </ul>
            <button className='loadBtn' onClick={this.loadMore.bind(this)}>Load More</button>
          </div>
        );
      } else {
        return (
          <div>
            <input className='inputSearch' onChange={this.handleChange} type="text" />
            <button className='searchBtn' onClick={this.searchBtn}>Search</button>
            <img  className='preload' src='http://eldiez.com.mx/images/loading_blue.gif' />
          </div>
        );
    )
  }
}


export default Gifs;
