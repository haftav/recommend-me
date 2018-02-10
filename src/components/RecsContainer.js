import React, { Component } from 'react';
import axios from 'axios';

import ModalSearch from './ModalSearch.js';
import ModalSubmit from './ModalSubmit.js';


class RecsContainer extends Component {
    constructor() {
        super();

        this.state = {
            recs: [],
            clicked: false,
            nameClicked: false,
            searchClicked: false,
            submitClicked: false,
            recText: '',
            recName: '',
            recTime: '',
            userName: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.grabRecName = this.grabRecName.bind(this);
        this.addToServer = this.addToServer.bind(this);
    }

    handleClick() {
        console.log('here');
        this.setState({ 
            clicked: ( this.state.clicked ? false : true ),
            nameClicked: false,
            submitClicked: false,
            searchClicked: false
        })
    }

    handleTextChange(val) {
        console.log(val);
        this.setState({ recText: val })
    }

    handleNameChange(val) {
        console.log(val);
        this.setState({ userName: val })
    }

    grabRecName(val) {
        this.setState({ 
            recName: val,
            nameClicked: (this.state.nameClicked ? false : true )
        })
    }

    addToServer() {
        console.log("here")
        axios.post('/api/recommends', {
            title: this.state.recName, 
            text: this.state.recText,
            name: this.state.userName,
            id: this.props.id
        }).then(res => {
            console.log(res.data);
            console.log(this.state.submitClicked)
            this.setState({ submitClicked: true })
        })
    }

    render() {
        const modalSearch = <ModalSearch  
                            grabRecName={this.grabRecName}
                            nameClicked={this.state.nameClicked}
                            searchClicked={this.state.searchClicked} />;
        const modalSubmit = <ModalSubmit handleTextChange={this.handleTextChange}
                            handleNameChange={this.handleNameChange}
                            handleClick={this.addToServer}
                            name={this.state.recName}
                            id={this.props.id}  />
        return (
            <div>
                <h2>Add Recommendation</h2>
                <button onClick={this.handleClick}>Click to Add</button>
                {
                    this.state.clicked
                    ?
                    modalSearch
                    :
                    null
                }
                {
                    this.state.nameClicked
                    ?
                    (!this.state.submitClicked ? modalSubmit : null)
                    :
                    null
                }
                    
            </div>
        )
    }
}

export default RecsContainer;