import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';

import Search from './Search.js';
import ResultsContainer from './ResultsContainer.js';
import ModalSubmit from './ModalSubmit.js';
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
        
        this.handleClick = this.handleClick.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.talkToServer = this.talkToServer.bind(this);
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
          let results = res.Similar.Results;

          results.unshift(res.Similar.Info[0]);
  
          this.setState({
            searchResults: results, 
            titleName: title, 
            titleText: text,
            searchClicked: (this.state.searchClicked ? false : true)
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
            <Search handleClick={this.handleClick}
            handleType={this.handleType}
            handleSearchChange={this.handleSearchChange}
            buttonText="Search"/>
        )
        const displayResults = <ResultsContainer results={ this.state.searchResults }
                                                onClick={this.props.grabRecName} />;

        const submit = <ModalSubmit name={ this.props.name }/>

        return (
            <div>
                {
                !this.state.searchClicked
                ?
                search
                :
                (this.props.nameClicked ? <ModalSubmit name={ this.props.name }/> : displayResults)
                }

            </div>
        )
    }

}

export default ModalSearch;

//handleType
//handleClick
//handleSearchChange