import React from 'react';

var ModalSubmit = ( { handleTextChange, handleNameChange } ) => {
    return (
        <div>
            <h4>Text</h4>
            <input placeholder="text" onChange={(e) => handleTextChange(e.target.value) }/> 
            <h4>Name</h4>
            <input placeholder="name" onChange={(e) => handleNameChange(e.target.value) }/>
        </div>        
    )
}

export default ModalSubmit;