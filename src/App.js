import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './App.css';
import key from './key.js';


import Header from './components/Header.js';
import Search from './components/Search.js';
import ResultsContainer from './components/ResultsContainer.js';
import DisplayTitle from './components/DisplayTitle';

class App extends Component {
  constructor() {
    super();


    this.state = {
      searchString: '',
      titleName: '',
      titleText: '',
      titleType: '',
      recs: [],
      userRecs: [],
      display: false
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  handleClick() {
    let type = (this.state.titleType !== '' ? `type=${this.state.titleType}&` : '')

    $.ajax({url:`https://tastedive.com/api/similar?q=${this.state.searchString}&limit=4&verbose=1&${type}k=${key}`, 
    type: 'GET', 
    dataType: 'jsonp',
    success: (res) => {
      console.log(res);
      if (res.Similar.Results.length > 0) {
        let title = res.Similar.Info[0].Name;
        let text = res.Similar.Info[0].wTeaser;
        this.setState({ recs: res.Similar.Results, titleName: title, titleText: text, display: true})
      } else {
        this.setState({ recs: [], titleName: '', display: false})
      }

    }})

  }

  handleSearchChange(val) {
    this.setState({ searchString: val })
  }

  handleType(val) {
    this.setState({ tileType: (val === 'all' ? '' : val)})
  }
  render() {
    return (
      <div className="App">
        <Header /> 
        <Search handleType={this.handleType}
                handleClick={this.handleClick}
                handleSearchChange={this.handleSearchChange} />
        {
          this.state.display
          ?
          <div>
            <DisplayTitle title={this.state.titleName} text={this.state.titleText}/>
            <ResultsContainer results={ this.state.recs }/>
          </div>
          :
          null
        }

      </div>
    );
  }
}

export default App;
