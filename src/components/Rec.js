import React, { Component } from 'react';

class Rec extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            name: this.props.name,
            oldText: '',
            oldName: '',
        }
    }


    render() {
        let { title, name, text, handleEditClick, handleDeleteClick } = this.props;
        const submitted = (
                        <div className="rec">
                            <h1>{ title }</h1>
                            <p>{ this.props.text }</p>
                                <div className="rec-container-right">
                                    <div className="time-name">
                                        <p>{ this.props.name }</p> 
                                        <p>5/2/3</p>
                                    </div>
                                    <div className="modify-buttons">
                                        <button onClick={() => handleEditClick(this.props.recId, text, name)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(this.props.recId)}>Delete</button>
                                    </div>
                                </div>

                        </div>
                        )

        return (
                submitted
            )
    }

}
export default Rec;


// Name
// Text
// Title
// Time (do later)