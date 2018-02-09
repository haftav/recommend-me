import React, { Component } from 'react';
import axios from 'axios';

import ModalSearch from './ModalSearch.js';


class RecsContainer extends Component {
    constructor() {
        super();

        this.state = {
            recs: [],
            clicked: false,
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
        this.setState({ clicked: ( this.state.clicked ? false : true ) })
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
    }

    render() {
        const modal = <ModalSearch handleTextChange={this.handleTextChange} 
                            handleNameChange={this.handleNameChange}
                            grabRecName={this.grabRecName}/>;

        return (
            <div>
                <h2>Add Recommendation</h2>
                <button onClick={this.handleClick}>Click to Add</button>
                {
                this.state.clicked
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