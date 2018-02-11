import React, { Component } from 'react';
import $ from 'jquery';

import Search from './Search.js';
import ResultsContainer from './ResultsContainer.js';
import key from '../key.js';



class ModalSearch extends Component {
    constructor() {
        super();

        this.state = {
            searchString: '',
            titleType: '',
            searchResults: [],
            searchClicked: false
        }
        
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.talkToServer = this.talkToServer.bind(this);
    }

    // handleClick() {
    //     let type = (this.state.titleType !== '' ? `type=${this.state.titleType}&` : '')
    
    //     $.ajax({url:`https://tastedive.com/api/similar?q=${this.state.searchString}&limit=4&verbose=1&${type}k=${key}`, 
    //     type: 'GET', 
    //     dataType: 'jsonp',
    //     success: this.talkToServer})
    // }

    handleKeyPress(e, name) {
        console.log(e.key);
        console.log(name);
        if (e.key === 'Enter') {
          $.ajax({url:`https://tastedive.com/api/similar?q=${name}&limit=4&verbose=1&movies&k=${key}`, 
          type: 'GET', 
          dataType: 'jsonp',
          success: this.talkToServer})
        }
      }
    
    talkToServer(res) {

        if (res.Similar.Results.length > 0) {
          let title = res.Similar.Info[0].Name;
          let text = res.Similar.Info[0].wTeaser;
          let results = res.Similar.Results;

          results.unshift(res.Similar.Info[0]);
  
          this.setState({
            searchResults: results, 
            titleName: title, 
            titleText: text,
            searchClicked: true
        })
    
        } else {
          this.setState({ searchResults: [], titleName: '', searchClicked: false})
        }
      }

    handleType(val) {
        this.setState({ titleType: (val === 'all' ? '' : val)})
    }

    handleSearchChange(val) {
        this.setState({ searchString: val })      
    }

    render() {
        const search = (
            <Search handleKeyPress={this.handleKeyPress}
            handleType={this.handleType}
            handleSearchChange={this.handleSearchChange}
            buttonText="Search"
            name={this.state.searchString}/>
        )
        const displayResults = <ResultsContainer results={ this.state.searchResults }
                                                onClick={this.props.grabRecName} />;


        return (
                <div>
                    {
                    !this.state.searchClicked
                    ?
                    search
                    :
                    (this.props.nameClicked ? null : displayResults)
                    }
                </div>
        )
    }

}

export default ModalSearch;

//handleType
//handleClick
//handleSearchChange