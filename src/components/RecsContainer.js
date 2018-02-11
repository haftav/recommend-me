import React, { Component } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { tmdbKey } from '../key.js';

import ModalSearch from './ModalSearch.js';
import ModalSubmit from './ModalSubmit.js';
import Rec from './Rec.js';
import Edit from './Edit.js';

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
            recImage: '',
            originalText: '',
            originalName: '',
            recTime: '',
            userName: '',
            editId: null
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.grabRecName = this.grabRecName.bind(this);
        this.addToServer = this.addToServer.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.displayRecPicture = this.displayRecPicture.bind(this);
    }

    componentWillReceiveProps(newProps) {
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
        this.displayRecPicture(val)
            .then(image => {
                console.log(image);
                this.setState({ 
                    recName: val,
                    recImage: image,
                    nameClicked: (this.state.nameClicked ? false : true )
                })
            })

    }

    displayRecPicture(title) {
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${title}`).then(res => {
            if (res.data.results[0]) {
              return 'http://image.tmdb.org/t/p/w500' + res.data.results[0].poster_path;
      
            } else {
              return null;
            }
          })
    }

    addToServer() {
        axios.post(`/api/recommends/${this.props.id}`, {
            title: this.state.recName, 
            text: this.state.recText,
            name: this.state.userName,
            image: this.state.recImage
        }).then(res => {
            this.setState({ 
                submitClicked: true, 
                clicked: false,
                recs: res.data
            })
        })
    }


    handleEditClick(key, text, name, image) {
        const originalText = this.state.recText;
        const originalName = this.state.userName;

        this.setState({ 
            editId: key,
            editClicked: true,
            originalText: originalText,
            originalName: originalName,
            recText: text,
            recName: image,
            userName: name
        })
    }

    handleDeleteClick(key) {
        axios.delete(`/api/recommends/${this.props.id}/${key}`).then(res => {
            this.setState({ recs: res.data })
        })
    }



    handleSubmitClick(title, name, text, image, recId) {
        axios.put(`/api/recommends/${this.props.id}`, { title, name, text, image, recId}).then(res => {
            this.setState({ editClicked: false, recs: res.data, editId: null })
        })
    }

    handleCancelClick() {
        this.setState({ 
            editClicked: false, 
            recText: this.state.originalText, 
            userName: this.state.originalName, 
            editId: null
        })
    }




    render() {
         const recommends = this.state.recs.map((el, idx) => {
             let title = el.title;
             let name = el.name;
             let text = el.text;
             let image = el.image

            return (
                el.recId === this.state.editId
                ?
                <Edit text={ this.state.recText }
                    title={ title }
                    name={ this.state.userName }
                    image={ image }
                    recId={el.recId}
                    key={idx}
                    handleTextChange={this.handleTextChange}
                    handleNameChange={this.handleNameChange}
                    handleSubmitClick={this.handleSubmitClick}
                    handleCancelClick={this.handleCancelClick}/>
                :
                <Rec title={title} 
                    name={name} 
                    text={text}
                    image={image}
                    recId={el.recId} 
                    id={this.props.id}
                    key={idx}
                    editClicked={this.state.editClicked}
                    handleEditClick={this.handleEditClick}
                    handleDeleteClick={this.handleDeleteClick} />
            )
            

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
            <div className="recs-container">
                <h2>Add Recommendation</h2>
                <button 
                        onClick={this.handleClick}
                        className="addButton">
                    <i className="fa fa-plus"></i>
                </button>
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