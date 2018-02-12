import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import './fonts.css';
import './App.css';
import key, { tmdbKey } from './key.js';
import CSSTransitionGroup from './react-transition-group/src/CSSTransition.js';



import Header from './components/Header.js';
import Search from './components/Search.js';
import ResultsContainer from './components/ResultsContainer.js';
import DisplayTitle from './components/DisplayTitle';
import RecsContainer from './components/RecsContainer.js';
import RecentList from './components/RecentList.js';

class App extends Component {
  constructor() {
    super();


    this.state = {
      id: null,
      searchString: '',
      titleName: '',
      titleText: '',
      titleType: '',
      image: '',
      recs: [],
      userRecs: [],
      display: false,
      clicked: false
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.talkToServer = this.talkToServer.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.getMoviePoster = this.getMoviePoster.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  handleClick(name) {
    let type = 'movies';

    $.ajax({url:`https://tastedive.com/api/similar?q=${name}&limit=4&verbose=1&movies&k=${key}`, 
    type: 'GET', 
    dataType: 'jsonp',
    success: this.talkToServer})

  }

  handleKeyPress(e, name) {
    if (e.key === 'Enter') {
      let type = 'movies';
      $.ajax({url:`https://tastedive.com/api/similar?q=${name}&limit=4&verbose=1&movies&k=${key}`, 
      type: 'GET', 
      dataType: 'jsonp',
      success: this.talkToServer})
    }
  }

  talkToServer(res) {
    if (res.Similar.Results.length > 0) {
      let title = res.Similar.Info[0].Name;
      let type = (this.state.titleType === '' ? 'all' : this.state.titleType);
      let text = res.Similar.Info[0].wTeaser;

      this.getMoviePoster(title)
        .then((image) => {
          axios.post('/api/items', { title: title, type: type, text: text, image: image}).then(res => {
            console.log(res);
            let index = res.data.findIndex((el) => el.title === title && el.type === type);
            if (index !== -1) {
              this.setState({ id: res.data[index].id, image: res.data[index].image });
            }
        })

      });
      this.setState({ 
        recs: res.Similar.Results, 
        titleName: title, 
        titleText: text, 
        display: true,
        searchString: ''
      })

    } else {
      this.setState({ recs: [], titleName: '', display: false})
    }
  }

  getMoviePoster(title) {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${title}`).then(res => {
      if (res.data.results[0]) {
        return 'http://image.tmdb.org/t/p/w500' + res.data.results[0].poster_path;

      } else {
        return null;
      }
    })
  }


  handleSearchChange(val) {
    this.setState({ searchString: val })
  }

  handleNameClick(val) {
    return ;
  }

  render() {
    return (
      <div className="App">
        <RecentList name={this.state.titleName} 
                    handleClick={this.handleClick}/>
        <Header /> 
        <Search handleType={this.handleType}
                handleClick={this.handleClick}
                handleSearchChange={this.handleSearchChange} 
                handleKeyPress={this.handleKeyPress}
                buttonText="Search"
                name={this.state.searchString}/>
        {
          this.state.display
          ?
          <div>
            <DisplayTitle title={this.state.titleName} 
                          text={this.state.titleText}
                          image={this.state.image}
                          shouldDisplay={this.state.display}/>
            <ResultsContainer results={ this.state.recs }
                              onClick={ this.handleClick }
                              findImage={this.getMoviePoster}
                              shouldDisplay={this.state.display}/>
            <RecsContainer id={this.state.id}
                            handleClick={this.handleClick}/>
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default App;
