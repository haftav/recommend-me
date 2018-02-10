import React, { Component } from 'react';
import axios from 'axios';

import ModalSearch from './ModalSearch.js';
import ModalSubmit from './ModalSubmit.js';
import Rec from './Rec.js';

class RecsContainer extends Component {
    constructor() {
        super();

        this.state = {
            recs: [],
            clicked: false,
            nameClicked: false,
            searchClicked: false,
            submitClicked: false,
            editClicked: false,
            recText: '',
            recName: '',
            newText: '',
            newName: '',
            recTime: '',
            userName: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.grabRecName = this.grabRecName.bind(this);
        this.addToServer = this.addToServer.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.baseState = Object.assign({}, this.state);
    }

    componentWillReceiveProps(newProps) {
        console.log("i'm getting props")
        axios.get(`api/recommends/${newProps.id}`).then(res => {
            this.setState({ recs: res.data })
        });
    }

    handleClick() {
        this.setState({ 
            clicked: ( this.state.clicked ? false : true ),
            nameClicked: false,
            submitClicked: false
        })
    }

    handleTextChange(val) {
        this.setState({ recText: val })
    }

    handleNameChange(val) {
        this.setState({ userName: val })
    }

    grabRecName(val) {
        this.setState({ 
            recName: val,
            nameClicked: (this.state.nameClicked ? false : true )
        })
    }

    addToServer() {
        axios.post(`/api/recommends/${this.props.id}`, {
            title: this.state.recName, 
            text: this.state.recText,
            name: this.state.userName,
        }).then(res => {
            console.log(res.data);
            this.setState({ 
                submitClicked: true, 
                clicked: false,
                recs: res.data
            })
        })
    }

    handleEditClick() {
        console.log('here');
        this.setState({ editClicked: true})
    }

    handleSubmitClick(title, name, text, recId) {
        console.log('id: ' + recId)
        axios.put(`/api/recommends/${this.props.id}`, { title, name, text, recId}).then(res => {
            console.log(res);
            this.setState({ editClicked: false, recs: res.data })
        })

    }

    handleCancelClick() {

    }



    render() {
         const recommends = this.state.recs.map((el, idx) => {
             let title = el.title;
             let name = el.name;
             let text = el.text;
             let recId = el.recId;
            return <Rec title={title} 
                        name={name} 
                        text={text}
                        recId={el.recId} 
                        id={this.props.id}
                        key={idx} 
                        editClicked={this.state.editClicked}
                        handleEditClick={this.handleEditClick}
                        handleCancelClick={this.handleCancelClick}
                        handleSubmitClick={this.handleSubmitClick} />
         });
        const modalSearch = <ModalSearch  
                            grabRecName={this.grabRecName}
                            nameClicked={this.state.nameClicked}
                            searchClicked={this.state.searchClicked} 
                            modalOpen={this.state.clicked}/>;
        const modalSubmit = <ModalSubmit handleTextChange={this.handleTextChange}
                            handleNameChange={this.handleNameChange}
                            handleClick={this.addToServer}
                            name={this.state.recName}
                            id={this.props.id} />
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

                { recommends }
                    
            </div>
        )
    }
}

export default RecsContainer;