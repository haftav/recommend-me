import React from 'react';

var Edit = ({ text, name, title, recId,
            handleSubmitClick, handleCancelClick, 
            handleNameChange, handleTextChange}) => {


    return (
        <div className="rec">
        <h1>{ title }</h1>
        <input value={ text } onChange={(e) => handleTextChange(e.target.value)}/>
        <div className="time-name">
            <input value={ name } onChange={(e) => handleNameChange(e.target.value)}/>
            <p>5/2/3</p>
        </div>
        <div className="modify-buttons">
            <button onClick={() => handleSubmitClick(title, name, text, recId)}>Submit</button>
            <button onClick={() => handleCancelClick()}>Cancel</button>
        </div>
    </div>        
    )
}

export default Edit;