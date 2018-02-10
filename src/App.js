import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './fonts.css';
import './App.css';
import key from './key.js';


import Header from './components/Header.js';
import Search from './components/Search.js';
import ResultsContainer from './components/ResultsContainer.js';
import DisplayTitle from './components/DisplayTitle';
import RecsContainer from './components/RecsContainer.js';

class App extends Component {
  constructor() {
    super();


    this.state = {
      id: null,
      searchString: '',
      titleName: '',
      titleText: '',
      titleType: '',
      recs: [],
      userRecs: [],
      display: false,
      clicked: false
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleType = this.handleType.bind(this);
    this.talkToServer = this.talkToServer.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);

  }

  handleClick() {
    let type = (this.state.titleType !== '' ? `type=${this.state.titleType}&` : '')

    $.ajax({url:`https://tastedive.com/api/similar?q=${this.state.searchString}&limit=4&verbose=1&${type}k=${key}`, 
    type: 'GET', 
    dataType: 'jsonp',
    success: this.talkToServer})

  }

  talkToServer(res) {

    if (res.Similar.Results.length > 0) {
      let title = res.Similar.Info[0].Name;
      let type = (this.state.titleType === '' ? 'all' : this.state.titleType);
      let text = res.Similar.Info[0].wTeaser;

      axios.post('/api/items', { title: title, type: type, text: text }).then(res => {
        console.log(res);
        let index = res.data.findIndex((el) => el.title === title && el.type === type);
        if (index !== -1) {
          this.setState({ id: res.data[index].id });
        }

      });
      this.setState({ 
        recs: res.Similar.Results, 
        titleName: title, 
        titleText: text, 
        display: true
      })

    } else {
      this.setState({ recs: [], titleName: '', display: false})
    }
  }


  handleSearchChange(val) {
    this.setState({ searchString: val })
  }

  handleType(val) {
    this.setState({ titleType: (val === 'all' ? '' : val)})
  }

  handleNameClick(val) {
    return ;
  }

  render() {
    return (
      <div className="App">
        <Header /> 
        <Search handleType={this.handleType}
                handleClick={this.handleClick}
                handleSearchChange={this.handleSearchChange} 
                buttonText="Search"/>
        {
          this.state.display
          ?
          <div>
            <DisplayTitle title={this.state.titleName} text={this.state.titleText}/>
            <ResultsContainer results={ this.state.recs }
                              onClick={ this.handleNameClick }/>
            <RecsContainer id={this.state.id}/>
          </div>
          :
          null
        }

      </div>
    );
  }
}

export default App;
