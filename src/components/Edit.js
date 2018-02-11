import React from 'react';

var Edit = ({ text, name, title, recId, image,
            handleSubmitClick, handleCancelClick, 
            handleNameChange, handleTextChange}) => {


    return (
        <div className="rec">
        <div className="rec-image">
            <img src={ image } alt={ title } />
        </div>
        <div className="rec-container-middle">
            <h1>{ title }</h1>
            <input value={ text } onChange={(e) => handleTextChange(e.target.value)}/>
        </div>

        <div className="rec-container-right">
            <div className="time-name">
                <input value={ name } onChange={(e) => handleNameChange(e.target.value)}/>
                <p>5/2/3</p>
            </div>
            <div className="modify-buttons">
                <button onClick={() => handleSubmitClick(title, name, text, image, recId)}>Submit</button>
                <button onClick={() => handleCancelClick()}>Cancel</button>
            </div>
        </div>

    </div>        
    )
}

export default Edit;