import React from 'react';

var ModalSubmit = ( { handleTextChange, handleNameChange, handleClick, name, id } ) => {
    return (
        <div className="modal-submit">
            <h2 className="movie-title"> { name } </h2>
            <textarea placeholder="Add comment..." 
                    className="text-input"
                    onChange={(e) => handleTextChange(e.target.value) }/> 
            <h4>Username</h4>
            <input className="name-input" 
                    placeholder="name" 
                    onChange={(e) => handleNameChange(e.target.value) }/>
            <h2><button onClick={handleClick}>Post</button></h2>
        </div>        
    )
}

export default ModalSubmit;