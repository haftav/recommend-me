import React, { Component } from 'react';
import axios from 'axios';

import ModalSearch from './ModalSearch.js';


class RecsContainer extends Component {
    constructor() {
        super();

        this.state = {
            recs: [],
            searchClicked: false,
            nameClicked: false,
            recText: '',
            recName: '',
            recTime: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.grabRecName = this.grabRecName.bind(this);
    }

    handleClick() {
        this.setState({ searchClicked: ( this.state.searchClicked ? false : true ) })
    }

    handleTextChange(val) {
        console.log(val);
        this.setState({ recText: val })
    }

    handleNameChange(val) {
        console.log(val);
        this.setState({ recName: val })
    }

    grabRecName(val) {
        console.log(val);
        this.setState({ 
            recName: val,
            nameClicked: (this.state.nameClicked ? false : true )
        })
    }

    render() {
        const modal = <ModalSearch handleTextChange={this.handleTextChange} 
                            handleNameChange={this.handleNameChange}
                            grabRecName={this.grabRecName}
                            nameClicked={this.state.nameClicked}
                            name={this.state.recName}/>;

        return (
            <div>
                <h2>Add Recommendation</h2>
                <button onClick={this.handleClick}>Click to Add</button>
                {
                this.state.searchClicked
                ?
                modal
                :
                null
                }
            </div>
        )
    }
}

export default RecsContainer;