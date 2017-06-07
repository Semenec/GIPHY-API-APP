import React from 'react';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.setState({
        inputValue: event.target.value
      })
    }

  search() {

    this.props.searchBtn(this.state.inputValue);
  }

  render() {
    return (
      <div>
        <input className='inputSearch' onChange={this.handleChange}  type="text" />
        <button className='searchBtn' onClick={this.search} >Search</button>
      </div>
    )
  }
}

export default Search;
