import React from 'react';
import 'whatwg-fetch';


const API_URL = 'http://api.giphy.com/v1/gifs/';
const API_KEY = 'dc6zaTOxFJmzC';
const API_URL_SEARCH = 'http://api.giphy.com/v1/gifs/search?q=car+dog&api_key=dc6zaTOxFJmzC&limit=1000';
const METHODS_TRENDING = 'trending';
const METHODS_SEATCH = 'search';

function getUrl (url,methods,valueSearch,offset, limit) {
  let searchValue = valueSearch;

  if(methods === 'search') {
     searchValue = GetSearchQuery(valueSearch);
  } else {
     searchValue = '';
  }
  return `${url}${methods}?${searchValue}&api_key=${API_KEY}&offset=${offset}&limit=${limit}`;
}

const GetSearchQuery = (value) => {
   value = value.split(' ');
   return 'q=' + value.join('+');
}

const LOAD_SIZE = 30;

class TestComponent extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.searchBtn = this.searchBtn.bind(this);

    this.state = {
      limit: LOAD_SIZE,
      offset: 1,
      images: [],
      preload: false,
      inputValue: '',
      appState: 'trending'
    };
  }

  componentDidMount() {
    this.updateImages();
  }

  fetchImages(methods) {
    let url = getUrl(API_URL, methods, this.state.inputValue, this.state.offset, this.state.limit);
    return fetch(url);
  }

  searchImages() {
    let url = API_URL_SEARCH;
    return fetch(url);
  }

  updateImages() {
    this.preload()
    this.fetchImages(METHODS_TRENDING)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          images: [...this.state.images, ...json.data.map((img) => img.images.downsized.url)],
          appState: 'trending'
          });
        this.preload();
      });
  }

  searchImages() {
    this.preload()
    this.fetchImages(METHODS_SEATCH)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          images: [...this.state.images, ...json.data.map((img) => img.images.downsized.url)],
          appState: 'search'
          });
        this.preload();
      });
  }

  loadMore() {
    this.setState({
      offset: this.state.offset + LOAD_SIZE
    }, () => {
      if (this.state.appState === 'trending') {
        this.updateImages();
      } else {
        this.searchImages();
      }
    });
  }

  preload() {
    if(this.state.preload === true) {
      this.setState({
        preload: false,
        img: []
      })
    } else {
      this.setState({
        preload: true,
        img: []
      })
    }
  }

handleChange(event) {
    this.setState({
      inputValue: event.target.value
    })
  }

searchBtn() {
  this.setState({
    images: []
  })
  if(this.state.inputValue === '') {
    this.updateImages();
  } else {
    this.searchImages();
  }
}

  render() {
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
    }
  }
}

export default TestComponent;
