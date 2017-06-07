import React from 'react';
import Gifs from './Gifs';
import LoadMore from './LoadMore';
import Search from './Search';

const API_URL = 'http://api.giphy.com/v1/gifs/';
const API_KEY = 'dc6zaTOxFJmzC';
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

function GetSearchQuery (value) {
   value = value.split(' ');
   return 'q=' + value.join('+');
}

const LOAD_SIZE = 30;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      limit: LOAD_SIZE,
      offset: 1,
      images: [],
      preload: false,
      inputValue: '',
      appState: 'trending'
    };

    this.loadMore = this.loadMore.bind(this);
    this.searchBtn = this.searchBtn.bind(this);
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

  componentDidMount() {
    this.updateImages()
  }

  fetchImages(methods) {
    let url = getUrl(API_URL, methods, this.state.inputValue, this.state.offset, this.state.limit);
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

  searchBtn(value) {
    this.setState({
      images: [],
      inputValue: value
    })
    if(value === '') {
      this.updateImages();
    } else {
      this.searchImages(value);
    }
  }

  render() {
    return (
      <div>
        <Search searchBtn={this.searchBtn}/>
        <Gifs images={this.state.images} preloadState={this.state.preload} />
        <LoadMore loadMore={this.loadMore}/>
      </div>
    );
  }
}

export default App;
