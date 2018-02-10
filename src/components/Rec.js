import React, { Component } from 'react';
import axios from 'axios';

import Edit from './Edit.js';

class Rec extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            name: this.props.name,
            oldText: '',
            oldName: ''
        }



        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }



    handleTextChange(val) {
        this.setState({ text: val })
    }

    handleNameChange(val) {
        this.setState({ name: val})
    }



    // handleCancelClick() {
    //     let baseState = this.baseState
    //     this.setState(baseState);
    // }

    //set back to false when submit or cancel 

    componentWillReceiveProps(newProps) {

    }

    render() {
        let {title, handleSubmitClick, handleCancelClick, handleEditClick} = this.props;
        const submitted = (
                        <div className="rec">
                            <h1>{ title }</h1>
                            <h3>{ this.props.text }</h3>
                            <div className="time-name">
                                <p>{ this.props.name }</p> 
                                <p>5/2/3</p>
                            </div>
                            <div className="modify-buttons">
                                <button onClick={handleEditClick}>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                        )
        const edit = <Edit text={ this.state.text }
                            title={ title }
                            name={ this.state.name }
                            recId={this.props.recId}
                            handleTextChange={this.handleTextChange}
                            handleNameChange={this.handleNameChange}
                            handleSubmitClick={handleSubmitClick}
                            handleCancelClick={handleCancelClick}/>
        return (
                this.props.editClicked 
                ?
                edit
                :
                submitted
            )
    }

}
export default Rec;


// Name
// Text
// Title
// Time (do later)