import React from 'react';

var Edit = ({ text, name, title, recId, image, time, score,
            handleSubmitClick, handleCancelClick, 
            handleNameChange, handleTextChange}) => {


    return (
        <div className="rec">
        <div className="rec-image">
            <img src={ image } alt={ title } />
        </div>
        <div className="rec-container-middle">
            <h1>{ title }</h1>
            <textarea value={ text } onChange={(e) => handleTextChange(e.target.value)}/>
        </div>

        <div className="rec-container-right">
            <div className="time-name">
                <input value={ name } onChange={(e) => handleNameChange(e.target.value)}/>
                <p>{time}</p>
            </div>
            <div className="modify-buttons">
                <button onClick={() => handleSubmitClick(title, name, text, image, time, score, recId)}>SUBMIT</button>
                <button onClick={() => handleCancelClick()}>CANCEL</button>
            </div>
        </div>
        <div className="score-buttons">
            <i className="fa fa-chevron-circle-up" ></i>
            <p className="score">{ score }</p>
            <i className="fa fa-chevron-circle-down" ></i>
        </div>

    </div>        
    )
}

export default Edit;